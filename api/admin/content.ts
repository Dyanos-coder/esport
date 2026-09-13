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

  const { type, title, excerpt, imageUrl, platform, linkUrl, publishedAt } = (req.body ?? {}) as Record<string, string>;
  if (!type || !title || !excerpt || !imageUrl || !publishedAt) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  await getPool().execute(
    'INSERT INTO content_items (type, title, excerpt, image_url, platform, link_url, published_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [type, title, excerpt, imageUrl, platform || null, linkUrl || null, publishedAt],
  );
  return res.status(201).json({ success: true });
}
