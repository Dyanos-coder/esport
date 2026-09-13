import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { RowDataPacket } from 'mysql2';
import { getPool } from '../../../lib/db.js';
import { getSession } from '../../../lib/auth.js';
import { computeStandings, type MatchRow } from '../../../lib/standings.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = getSession(req);
  if (!session || session.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { countryId } = req.query;
  const pool = getPool();

  const [countryRows] = await pool.execute<RowDataPacket[]>('SELECT id, name, flag FROM countries WHERE id = ?', [countryId]);
  const country = countryRows[0];
  if (!country) return res.status(404).json({ error: 'Country not found' });

  const [ungrouped] = await pool.execute<RowDataPacket[]>(
    `SELECT id, pseudo, full_name FROM player_registrations
     WHERE country_id = ? AND status = 'accepted' AND group_id IS NULL
     ORDER BY pseudo`,
    [countryId],
  );

  const [groups] = await pool.execute<RowDataPacket[]>(
    'SELECT id, name FROM qualification_groups WHERE country_id = ? ORDER BY name',
    [countryId],
  );

  const result = [];
  for (const group of groups) {
    const [members] = await pool.execute<RowDataPacket[]>(
      'SELECT id, pseudo, full_name FROM player_registrations WHERE group_id = ? ORDER BY pseudo',
      [group.id],
    );
    const [matches] = await pool.execute<RowDataPacket[]>(
      `SELECT gm.id, gm.player1_id, gm.player2_id, gm.score1, gm.score2,
              p1.pseudo AS player1_pseudo, p2.pseudo AS player2_pseudo
       FROM group_matches gm
       JOIN player_registrations p1 ON p1.id = gm.player1_id
       JOIN player_registrations p2 ON p2.id = gm.player2_id
       WHERE gm.group_id = ?
       ORDER BY gm.id`,
      [group.id],
    );
    const standings = computeStandings(
      members.map((m) => ({ id: m.id, pseudo: m.pseudo })),
      matches as unknown as MatchRow[],
    );
    result.push({ id: group.id, name: group.name, members, matches, standings });
  }

  return res.status(200).json({ country, ungrouped, groups: result });
}
