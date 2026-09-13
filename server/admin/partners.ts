import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPool } from '../../lib/db.js';
import { getSession } from '../../lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = getSession(req);
  if (!session || session.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { name, tier, logoUrl } = (req.body ?? {}) as Record<string, string>;
  if (!name || !tier) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  await getPool().execute(
    'INSERT INTO partners (name, tier, logo_url) VALUES (?, ?, ?)',
    [name, tier, logoUrl || null],
  );
  return res.status(201).json({ success: true });
}
