const db = require('../config/db');
const response = require('../utils/response');

/**
 * GET all skills
 */
exports.getAllSkills = async (req, res) => {
  const [skills] = await db.query('SELECT * FROM skills');
  response.success(res, 'Skills fetched', skills);
};

/**
 * ADD skill offered by user
 */
exports.addOfferedSkill = async (req, res) => {
  const { skill_id } = req.body;
  const userId = req.user.user_id;

  await db.query(
    'INSERT INTO user_skills_offered (user_id, skill_id) VALUES (?, ?)',
    [userId, skill_id]
  );

  response.success(res, 'Skill added to offered list');
};

/**
 * ADD skill wanted by user
 */
exports.addWantedSkill = async (req, res) => {
  const { skill_id } = req.body;
  const userId = req.user.user_id;

  await db.query(
    'INSERT INTO user_skills_wanted (user_id, skill_id) VALUES (?, ?)',
    [userId, skill_id]
  );

  response.success(res, 'Skill added to wanted list');
};

/**
 * CREATE swap request
 */
exports.createSwapRequest = async (req, res) => {
  const { receiver_id, skill_offered_id, skill_requested_id } = req.body;
  const requester_id = req.user.user_id;

  await db.query(
    `INSERT INTO swap_requests 
     (requester_id, receiver_id, skill_offered_id, skill_requested_id)
     VALUES (?, ?, ?, ?)`,
    [requester_id, receiver_id, skill_offered_id, skill_requested_id]
  );

  response.success(res, 'Swap request sent');
};
