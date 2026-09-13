import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { QueryError } from 'mysql2';
import { getPool } from '../../lib/db';
import { getSession } from '../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = getSession(req);
  if (!session || session.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { name, code, flag, status } = (req.body ?? {}) as Record<string, string>;
  if (!name || !code || !flag) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await getPool().execute(
      'INSERT INTO countries (name, code, flag, status) VALUES (?, ?, ?, ?)',
      [name, code.toUpperCase(), flag, status || 'open'],
    );
    return res.status(201).json({ success: true });
  } catch (err) {
    if ((err as QueryError).code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Nom ou code déjà utilisé' });
    }
    console.error('Create country failed', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
