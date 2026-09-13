import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { RowDataPacket } from 'mysql2';
import { getPool } from '../lib/db';
import { getSession } from '../lib/auth';

interface RegistrationRow extends RowDataPacket {
  id: number;
  country_id: number;
  country_name: string;
  country_flag: string;
  pseudo: string;
  full_name: string;
  phone: string;
  level: string;
  message: string | null;
  status: 'pending' | 'accepted' | 'rejected';
  email: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const session = getSession(req);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });

  const pool = getPool();

  if (req.method === 'GET') {
    const [rows] = await pool.execute<RegistrationRow[]>(
      `SELECT r.id, r.country_id, c.name AS country_name, c.flag AS country_flag,
              r.pseudo, r.full_name, r.phone, r.level, r.message, r.status, u.email
       FROM player_registrations r
       JOIN users u ON u.id = r.user_id
       JOIN countries c ON c.id = r.country_id
       WHERE r.user_id = ?`,
      [session.userId],
    );
    const registration = rows[0];
    if (!registration) return res.status(404).json({ error: 'No registration found' });
    return res.status(200).json({ registration });
  }

  if (req.method === 'PUT') {
    const { countryId, pseudo, fullName, phone, level, message } = (req.body ?? {}) as {
      countryId?: number; pseudo?: string; fullName?: string; phone?: string; level?: string; message?: string;
    };
    if (!countryId || !pseudo || !fullName || !phone || !level) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    await pool.execute(
      `UPDATE player_registrations SET country_id = ?, pseudo = ?, full_name = ?, phone = ?, level = ?, message = ?
       WHERE user_id = ?`,
      [countryId, pseudo, fullName, phone, level, message || null, session.userId],
    );
    return res.status(200).json({ success: true });
  }

  res.setHeader('Allow', 'GET, PUT');
  return res.status(405).json({ error: 'Method not allowed' });
}
