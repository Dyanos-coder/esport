import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPool } from '../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const [rows] = await getPool().query(
    'SELECT id, name, tier, logo_url FROM partners ORDER BY sort_order, name',
  );
  return res.status(200).json({ partners: rows });
}
