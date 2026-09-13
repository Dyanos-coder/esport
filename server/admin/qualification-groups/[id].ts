import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPool } from '../../../lib/db.js';
import { getSession } from '../../../lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', 'DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = getSession(req);
  if (!session || session.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { id } = req.query;
  // Members fall back to ungrouped (FK ON DELETE SET NULL), matches are removed (FK ON DELETE CASCADE).
  await getPool().execute('DELETE FROM qualification_groups WHERE id = ?', [id as string]);
  return res.status(200).json({ success: true });
}
