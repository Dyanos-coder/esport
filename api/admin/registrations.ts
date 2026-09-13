import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPool } from '../../lib/db';
import { getSession } from '../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = getSession(req);
  if (!session || session.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const [rows] = await getPool().execute(
    `SELECT r.id, c.name AS country, c.flag AS country_flag, r.pseudo, r.full_name, r.phone, r.level,
            r.message, r.status, r.created_at, u.email
     FROM player_registrations r
     JOIN users u ON u.id = r.user_id
     JOIN countries c ON c.id = r.country_id
     ORDER BY r.created_at DESC`,
  );
  return res.status(200).json({ registrations: rows });
}
