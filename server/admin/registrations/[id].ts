import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { RowDataPacket } from 'mysql2';
import { getPool } from '../../../lib/db.js';
import { getSession } from '../../../lib/auth.js';
import { sendStatusChangeEmail } from '../../../lib/email.js';

const VALID_STATUSES = ['pending', 'accepted', 'rejected'];

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
  const { status } = (req.body ?? {}) as { status?: string };
  if (!status || !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const pool = getPool();
  await pool.execute('UPDATE player_registrations SET status = ? WHERE id = ?', [status, id]);

  if (status === 'accepted' || status === 'rejected') {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT r.pseudo, u.email FROM player_registrations r JOIN users u ON u.id = r.user_id WHERE r.id = ?`,
      [id],
    );
    const registrant = rows[0];
    if (registrant) {
      await sendStatusChangeEmail(registrant.email, registrant.pseudo, status);
    }
  }

  return res.status(200).json({ success: true });
}
