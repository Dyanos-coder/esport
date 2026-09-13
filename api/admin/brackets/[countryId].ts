import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { RowDataPacket } from 'mysql2';
import { getPool } from '../../../lib/db';
import { getSession } from '../../../lib/auth';
import { generateBracketSeeds } from '../../../lib/bracket';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const session = getSession(req);
  if (!session || session.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { countryId } = req.query;
  const pool = getPool();

  if (req.method === 'GET') {
    const [matches] = await pool.execute<RowDataPacket[]>(
      `SELECT bm.id, bm.round, bm.slot, bm.player1_id, bm.player2_id, bm.score1, bm.score2, bm.winner_id,
              p1.pseudo AS player1_pseudo, p2.pseudo AS player2_pseudo
       FROM bracket_matches bm
       LEFT JOIN player_registrations p1 ON p1.id = bm.player1_id
       LEFT JOIN player_registrations p2 ON p2.id = bm.player2_id
       WHERE bm.country_id = ?
       ORDER BY bm.round, bm.slot`,
      [countryId],
    );
    return res.status(200).json({ matches });
  }

  if (req.method === 'POST') {
    const { playerIds } = (req.body ?? {}) as { playerIds?: number[] };
    if (!playerIds || playerIds.length < 2) {
      return res.status(400).json({ error: 'Il faut au moins 2 joueurs pour générer un bracket' });
    }

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      // Regenerating replaces any existing bracket for this country.
      await conn.execute('DELETE FROM bracket_matches WHERE country_id = ?', [countryId]);
      await conn.execute('UPDATE player_registrations SET is_finalist = FALSE WHERE country_id = ?', [countryId]);

      const seeds = generateBracketSeeds(playerIds);
      for (const seed of seeds) {
        await conn.execute(
          'INSERT INTO bracket_matches (country_id, round, slot, player1_id, player2_id, winner_id) VALUES (?, ?, ?, ?, ?, ?)',
          [countryId, seed.round, seed.slot, seed.player1_id, seed.player2_id, seed.winner_id],
        );
      }

      // If generation immediately resolved the whole bracket via byes (e.g. only 2 players, one bye),
      // mark finalists right away.
      const maxRound = Math.max(...seeds.map((s) => s.round));
      const final = seeds.find((s) => s.round === maxRound);
      if (final && final.player1_id && final.player2_id && final.winner_id) {
        await conn.execute('UPDATE player_registrations SET is_finalist = TRUE WHERE id IN (?, ?)', [final.player1_id, final.player2_id]);
      }

      await conn.commit();
      return res.status(201).json({ success: true });
    } catch (err) {
      await conn.rollback();
      console.error('Bracket generation failed', err);
      return res.status(500).json({ error: 'Server error' });
    } finally {
      conn.release();
    }
  }

  if (req.method === 'DELETE') {
    await pool.execute('DELETE FROM bracket_matches WHERE country_id = ?', [countryId]);
    await pool.execute('UPDATE player_registrations SET is_finalist = FALSE WHERE country_id = ?', [countryId]);
    return res.status(200).json({ success: true });
  }

  res.setHeader('Allow', 'GET, POST, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}
