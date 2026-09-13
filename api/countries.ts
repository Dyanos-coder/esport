import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPool } from '../lib/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const [rows] = await getPool().query(`
    SELECT c.id, c.name, c.code, c.flag, c.status,
      COUNT(CASE WHEN r.status = 'accepted' THEN 1 END) AS qualified_count,
      COUNT(r.id) AS total_registrations
    FROM countries c
    LEFT JOIN player_registrations r ON r.country_id = c.id
    GROUP BY c.id
    ORDER BY c.sort_order, c.name
  `);
  return res.status(200).json({ countries: rows });
}
