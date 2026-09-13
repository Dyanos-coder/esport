import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPool } from '../../../lib/db.js';
import { getSession } from '../../../lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', 'PATCH');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = getSession(req);
  if (!session || session.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { id } = req.query;
  const { score1, score2 } = (req.body ?? {}) as { score1: number | null; score2: number | null };

  await getPool().execute('UPDATE group_matches SET score1 = ?, score2 = ? WHERE id = ?', [score1, score2, id]);
  return res.status(200).json({ success: true });
}
