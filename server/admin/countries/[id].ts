import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { QueryError, RowDataPacket } from 'mysql2';
import { getPool } from '../../../lib/db.js';
import { getSession } from '../../../lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const session = getSession(req);
  if (!session || session.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { id } = req.query;

  if (req.method === 'PATCH') {
    const { name, code, flag, status } = (req.body ?? {}) as Record<string, string>;
    const fields: string[] = [];
    const values: (string | number)[] = [];
    if (name !== undefined) { fields.push('name = ?'); values.push(name); }
    if (code !== undefined) { fields.push('code = ?'); values.push(code.toUpperCase()); }
    if (flag !== undefined) { fields.push('flag = ?'); values.push(flag); }
    if (status !== undefined) { fields.push('status = ?'); values.push(status); }
    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    values.push(id as string);

    try {
      await getPool().execute(`UPDATE countries SET ${fields.join(', ')} WHERE id = ?`, values);
      return res.status(200).json({ success: true });
    } catch (err) {
      if ((err as QueryError).code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Nom ou code déjà utilisé' });
      }
      console.error('Update country failed', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  if (req.method === 'DELETE') {
    const [rows] = await getPool().execute<RowDataPacket[]>(
      'SELECT COUNT(*) AS n FROM player_registrations WHERE country_id = ?',
      [id as string],
    );
    if (rows[0].n > 0) {
      return res.status(409).json({ error: 'Impossible de supprimer un pays avec des candidatures existantes' });
    }
    await getPool().execute('DELETE FROM countries WHERE id = ?', [id as string]);
    return res.status(200).json({ success: true });
  }

  res.setHeader('Allow', 'PATCH, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}
