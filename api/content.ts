import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPool } from '../lib/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const [rows] = await getPool().query(
    'SELECT id, type, title, excerpt, image_url, platform, link_url, published_at FROM content_items ORDER BY published_at DESC',
  );
  return res.status(200).json({ items: rows });
}
