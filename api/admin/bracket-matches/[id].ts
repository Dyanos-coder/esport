import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { RowDataPacket } from 'mysql2';
import { getPool } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', 'PATCH');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = getSession(req);
  if (!session || session.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { id } = req.query;
  const { score1, score2 } = (req.body ?? {}) as { score1: number | null; score2: number | null };

  const pool = getPool();
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [rows] = await conn.execute<RowDataPacket[]>(
      'SELECT id, country_id, round, slot, player1_id, player2_id FROM bracket_matches WHERE id = ? FOR UPDATE',
      [id],
    );
    const match = rows[0];
    if (!match) {
      await conn.rollback();
      return res.status(404).json({ error: 'Match not found' });
    }
    if (!match.player1_id || !match.player2_id) {
      await conn.rollback();
      return res.status(400).json({ error: 'Les deux joueurs de ce match ne sont pas encore connus' });
    }

    let winnerId: number | null = null;
    if (score1 !== null && score2 !== null) {
      if (score1 === score2) {
        await conn.rollback();
        return res.status(400).json({ error: 'Un match à élimination directe ne peut pas se terminer nul' });
      }
      winnerId = score1 > score2 ? match.player1_id : match.player2_id;
    }

    await conn.execute('UPDATE bracket_matches SET score1 = ?, score2 = ?, winner_id = ? WHERE id = ?', [score1, score2, winnerId, id]);

    if (winnerId) {
      const [[{ maxRound }]] = await conn.query<RowDataPacket[]>(
        'SELECT MAX(round) AS maxRound FROM bracket_matches WHERE country_id = ?',
        [match.country_id],
      );

      if (match.round === maxRound) {
        await conn.execute('UPDATE player_registrations SET is_finalist = TRUE WHERE id IN (?, ?)', [match.player1_id, match.player2_id]);
        await conn.execute("UPDATE countries SET status = 'qualified' WHERE id = ?", [match.country_id]);
      } else {
        const nextRound = match.round + 1;
        const nextSlot = Math.floor(match.slot / 2);
        const column = match.slot % 2 === 0 ? 'player1_id' : 'player2_id';
        await conn.execute(
          `UPDATE bracket_matches SET ${column} = ? WHERE country_id = ? AND round = ? AND slot = ?`,
          [winnerId, match.country_id, nextRound, nextSlot],
        );
      }
    }

    await conn.commit();
    return res.status(200).json({ success: true });
  } catch (err) {
    await conn.rollback();
    console.error('Bracket score update failed', err);
    return res.status(500).json({ error: 'Server error' });
  } finally {
    conn.release();
  }
}
