import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPool } from '../../../lib/db.js';
import { getSession } from '../../../lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const session = getSession(req);
  if (!session || session.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { id } = req.query;

  if (req.method === 'PATCH') {
    const { type, title, excerpt, imageUrl, platform, linkUrl, publishedAt } = (req.body ?? {}) as Record<string, string>;
    const fields: string[] = [];
    const values: (string | null)[] = [];
    if (type !== undefined) { fields.push('type = ?'); values.push(type); }
    if (title !== undefined) { fields.push('title = ?'); values.push(title); }
    if (excerpt !== undefined) { fields.push('excerpt = ?'); values.push(excerpt); }
    if (imageUrl !== undefined) { fields.push('image_url = ?'); values.push(imageUrl); }
    if (platform !== undefined) { fields.push('platform = ?'); values.push(platform || null); }
    if (linkUrl !== undefined) { fields.push('link_url = ?'); values.push(linkUrl || null); }
    if (publishedAt !== undefined) { fields.push('published_at = ?'); values.push(publishedAt); }
    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    values.push(id as string);
    await getPool().execute(`UPDATE content_items SET ${fields.join(', ')} WHERE id = ?`, values);
    return res.status(200).json({ success: true });
  }

  if (req.method === 'DELETE') {
    await getPool().execute('DELETE FROM content_items WHERE id = ?', [id as string]);
    return res.status(200).json({ success: true });
  }

  res.setHeader('Allow', 'PATCH, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}
