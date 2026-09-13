import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { RowDataPacket } from 'mysql2';
import { getPool } from '../lib/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const [rows] = await getPool().query<RowDataPacket[]>('SELECT maintenance_mode FROM site_settings WHERE id = 1');
  const maintenanceMode = Boolean(rows[0]?.maintenance_mode);
  return res.status(200).json({ maintenanceMode });
}
