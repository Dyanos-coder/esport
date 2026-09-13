import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPool } from '../../lib/db.js';
import { getSession } from '../../lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = getSession(req);
  if (!session || session.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const [rows] = await getPool().query(`
    SELECT r.id, r.pseudo, r.full_name, r.level, u.email, c.id AS country_id, c.name AS country_name, c.flag AS country_flag
    FROM player_registrations r
    JOIN users u ON u.id = r.user_id
    JOIN countries c ON c.id = r.country_id
    WHERE r.is_finalist = TRUE
    ORDER BY c.name, r.pseudo
  `);
  return res.status(200).json({ finalists: rows });
}
