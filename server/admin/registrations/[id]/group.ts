import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { RowDataPacket } from 'mysql2';
import { getPool } from '../../../../lib/db.js';
import { getSession } from '../../../../lib/auth.js';

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
  const { groupId } = (req.body ?? {}) as { groupId: number | null };

  const pool = getPool();
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [regRows] = await conn.execute<RowDataPacket[]>(
      'SELECT id, country_id, group_id FROM player_registrations WHERE id = ? FOR UPDATE',
      [id],
    );
    const registration = regRows[0];
    if (!registration) {
      await conn.rollback();
      return res.status(404).json({ error: 'Registration not found' });
    }

    // Leaving the previous group: drop that group's matches involving this player.
    if (registration.group_id) {
      await conn.execute(
        'DELETE FROM group_matches WHERE group_id = ? AND (player1_id = ? OR player2_id = ?)',
        [registration.group_id, id, id],
      );
    }

    if (groupId) {
      const [groupRows] = await conn.execute<RowDataPacket[]>(
        'SELECT id, country_id FROM qualification_groups WHERE id = ?',
        [groupId],
      );
      const group = groupRows[0];
      if (!group) {
        await conn.rollback();
        return res.status(400).json({ error: 'Group not found' });
      }
      if (group.country_id !== registration.country_id) {
        await conn.rollback();
        return res.status(400).json({ error: 'Group belongs to a different country' });
      }

      await conn.execute('UPDATE player_registrations SET group_id = ? WHERE id = ?', [groupId, id]);

      const [members] = await conn.execute<RowDataPacket[]>(
        'SELECT id FROM player_registrations WHERE group_id = ? AND id != ?',
        [groupId, id],
      );
      for (const member of members) {
        await conn.execute(
          'INSERT INTO group_matches (group_id, player1_id, player2_id) VALUES (?, ?, ?)',
          [groupId, id, member.id],
        );
      }
    } else {
      await conn.execute('UPDATE player_registrations SET group_id = NULL WHERE id = ?', [id]);
    }

    await conn.commit();
    return res.status(200).json({ success: true });
  } catch (err) {
    await conn.rollback();
    console.error('Group assignment failed', err);
    return res.status(500).json({ error: 'Server error' });
  } finally {
    conn.release();
  }
}
