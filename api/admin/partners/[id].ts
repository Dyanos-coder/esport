import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPool } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const session = getSession(req);
  if (!session || session.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { id } = req.query;

  if (req.method === 'PATCH') {
    const { name, tier, logoUrl } = (req.body ?? {}) as Record<string, string>;
    const fields: string[] = [];
    const values: (string | null)[] = [];
    if (name !== undefined) { fields.push('name = ?'); values.push(name); }
    if (tier !== undefined) { fields.push('tier = ?'); values.push(tier); }
    if (logoUrl !== undefined) { fields.push('logo_url = ?'); values.push(logoUrl || null); }
    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    values.push(id as string);
    await getPool().execute(`UPDATE partners SET ${fields.join(', ')} WHERE id = ?`, values);
    return res.status(200).json({ success: true });
  }

  if (req.method === 'DELETE') {
    await getPool().execute('DELETE FROM partners WHERE id = ?', [id as string]);
    return res.status(200).json({ success: true });
  }

  res.setHeader('Allow', 'PATCH, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}
