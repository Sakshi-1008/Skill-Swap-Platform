const db = require('../config/db');

/**
 * Create swap request
 */
exports.createSwap = async (
  requesterId,
  receiverId,
  skillOfferedId,
  skillRequestedId
) => {
  await db.query(
    `INSERT INTO swap_requests
     (requester_id, receiver_id, skill_offered_id, skill_requested_id)
     VALUES (?, ?, ?, ?)`,
    [requesterId, receiverId, skillOfferedId, skillRequestedId]
  );
};

/**
 * Get swap requests for a user
 */
exports.getUserSwaps = async (userId) => {
  const [rows] = await db.query(
    `SELECT sr.swap_id, sr.status, sr.created_at,
            u1.name AS requester_name,
            u2.name AS receiver_name,
            s1.skill_name AS offered_skill,
            s2.skill_name AS requested_skill
     FROM swap_requests sr
     JOIN users u1 ON sr.requester_id = u1.user_id
     JOIN users u2 ON sr.receiver_id = u2.user_id
     JOIN skills s1 ON sr.skill_offered_id = s1.skill_id
     JOIN skills s2 ON sr.skill_requested_id = s2.skill_id
     WHERE sr.requester_id = ? OR sr.receiver_id = ?`,
    [userId, userId]
  );
  return rows;
};

/**
 * Update swap status (accept / reject / cancel)
 */
exports.updateSwapStatus = async (swapId, status) => {
  await db.query(
    'UPDATE swap_requests SET status = ? WHERE swap_id = ?',
    [status, swapId]
  );
};
