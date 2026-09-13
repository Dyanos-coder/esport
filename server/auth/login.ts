import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import type { RowDataPacket } from 'mysql2';
import { getPool } from '../../lib/db.js';
import { signSession, setSessionCookie } from '../../lib/auth.js';

interface UserRow extends RowDataPacket {
  id: number;
  password_hash: string;
  role: 'player' | 'admin';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = (req.body ?? {}) as { email?: string; password?: string };
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  try {
    const [rows] = await getPool().execute<UserRow[]>(
      'SELECT id, password_hash, role FROM users WHERE email = ?',
      [email],
    );
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signSession({ userId: user.id, role: user.role });
    setSessionCookie(res, token);
    return res.status(200).json({ success: true, user: { id: user.id, email, role: user.role } });
  } catch (err) {
    console.error('Login failed', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
