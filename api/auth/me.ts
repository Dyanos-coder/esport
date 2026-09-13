import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { RowDataPacket } from 'mysql2';
import { getPool } from '../../lib/db.js';
import { getSession } from '../../lib/auth.js';

interface UserRow extends RowDataPacket {
  id: number;
  email: string;
  role: 'player' | 'admin';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = getSession(req);
  if (!session) return res.status(200).json({ user: null });

  try {
    const [rows] = await getPool().execute<UserRow[]>(
      'SELECT id, email, role FROM users WHERE id = ?',
      [session.userId],
    );
    return res.status(200).json({ user: rows[0] ?? null });
  } catch (err) {
    console.error('Me lookup failed', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
