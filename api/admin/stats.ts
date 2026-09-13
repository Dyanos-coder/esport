import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { RowDataPacket } from 'mysql2';
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

  const pool = getPool();

  const [statusRows] = await pool.query<RowDataPacket[]>(
    'SELECT status, COUNT(*) AS n FROM player_registrations GROUP BY status',
  );
  const totals = { total: 0, pending: 0, accepted: 0, rejected: 0 };
  for (const row of statusRows) {
    totals[row.status as 'pending' | 'accepted' | 'rejected'] = row.n;
    totals.total += row.n;
  }

  const [levelRows] = await pool.query<RowDataPacket[]>(
    'SELECT level, COUNT(*) AS n FROM player_registrations GROUP BY level',
  );
  const byLevel: Record<string, number> = { amateur: 0, semipro: 0, pro: 0 };
  for (const row of levelRows) {
    byLevel[row.level] = row.n;
  }

  const [countryRows] = await pool.query<RowDataPacket[]>(`
    SELECT c.id, c.name, c.code, c.flag, c.status,
      COUNT(r.id) AS total_registrations,
      COUNT(CASE WHEN r.status = 'accepted' THEN 1 END) AS qualified_count
    FROM countries c
    LEFT JOIN player_registrations r ON r.country_id = c.id
    GROUP BY c.id
    ORDER BY total_registrations DESC, c.name ASC
  `);

  const [trendRows] = await pool.query<RowDataPacket[]>(`
    SELECT DATE(created_at) AS date, COUNT(*) AS n
    FROM player_registrations
    WHERE created_at >= (CURDATE() - INTERVAL 13 DAY)
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `);
  const trendMap = new Map<string, number>(
    trendRows.map((r) => [r.date instanceof Date ? r.date.toISOString().slice(0, 10) : String(r.date).slice(0, 10), r.n]),
  );
  const trend: { date: string; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    trend.push({ date: key, count: trendMap.get(key) ?? 0 });
  }

  return res.status(200).json({ totals, byLevel, byCountry: countryRows, trend });
}
