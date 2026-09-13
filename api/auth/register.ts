import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import { getPool } from '../../lib/db';
import { signSession, setSessionCookie } from '../../lib/auth';
import { sendSignupConfirmationEmail } from '../../lib/email';

interface SignupBody {
  email?: string;
  password?: string;
  countryId?: number;
  pseudo?: string;
  fullName?: string;
  phone?: string;
  level?: string;
  message?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, countryId, pseudo, fullName, phone, level, message } = (req.body ?? {}) as SignupBody;

  if (!email || !password || !countryId || !pseudo || !fullName || !phone || !level) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  const pool = getPool();
  const conn = await pool.getConnection();

  try {
    const [existing] = await conn.execute<RowDataPacket[]>('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Email already used' });
    }

    const [country] = await conn.execute<RowDataPacket[]>('SELECT id FROM countries WHERE id = ?', [countryId]);
    if (country.length === 0) {
      return res.status(400).json({ error: 'Invalid country' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await conn.beginTransaction();

    const [userResult] = await conn.execute<ResultSetHeader>(
      'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
      [email, passwordHash, 'player'],
    );
    const userId = userResult.insertId;

    await conn.execute(
      `INSERT INTO player_registrations (user_id, country_id, pseudo, full_name, phone, level, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, countryId, pseudo, fullName, phone, level, message || null],
    );

    await conn.commit();

    await sendSignupConfirmationEmail(email, pseudo);

    const token = signSession({ userId, role: 'player' });
    setSessionCookie(res, token);
    return res.status(201).json({ success: true, user: { id: userId, email, role: 'player' } });
  } catch (err) {
    await conn.rollback();
    console.error('Signup failed', err);
    return res.status(500).json({ error: 'Server error' });
  } finally {
    conn.release();
  }
}
