import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : undefined,
      connectionLimit: 5,
    });
  }
  return pool;
}

interface RegistrationBody {
  country?: string;
  pseudo?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  level?: string;
  message?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body as RegistrationBody;
  const { country, pseudo, fullName, email, phone, level, message } = body ?? {};

  if (!country || !pseudo || !fullName || !email || !phone || !level) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await getPool().execute(
      `INSERT INTO player_registrations (country, pseudo, full_name, email, phone, level, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [country, pseudo, fullName, email, phone, level, message || null],
    );
    return res.status(201).json({ success: true });
  } catch (err) {
    console.error('Failed to insert player registration', err);
    return res.status(500).json({ error: 'Database error' });
  }
}
