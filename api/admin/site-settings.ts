import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPool } from '../../lib/db.js';
import { getSession } from '../../lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const session = getSession(req);
  if (!session || session.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (req.method !== 'PATCH') {
    res.setHeader('Allow', 'PATCH');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { maintenanceMode } = (req.body ?? {}) as { maintenanceMode?: boolean };
  if (typeof maintenanceMode !== 'boolean') {
    return res.status(400).json({ error: 'maintenanceMode must be a boolean' });
  }

  await getPool().execute('UPDATE site_settings SET maintenance_mode = ? WHERE id = 1', [maintenanceMode]);
  return res.status(200).json({ success: true, maintenanceMode });
}
