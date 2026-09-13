import type { VercelRequest, VercelResponse } from '@vercel/node';
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

  const { countryId, name } = (req.body ?? {}) as { countryId?: number; name?: string };
  if (!countryId || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const [result] = await getPool().execute(
    'INSERT INTO qualification_groups (country_id, name) VALUES (?, ?)',
    [countryId, name],
  );
  return res.status(201).json({ success: true, id: (result as { insertId: number }).insertId });
}
