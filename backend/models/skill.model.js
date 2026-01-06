const db = require('../config/db');

/**
 * Get all skills
 */
exports.getAllSkills = async () => {
  const [rows] = await db.query('SELECT * FROM skills');
  return rows;
};

/**
 * Add skill to offered list
 */
exports.addOfferedSkill = async (userId, skillId) => {
  await db.query(
    'INSERT INTO user_skills_offered (user_id, skill_id) VALUES (?, ?)',
    [userId, skillId]
  );
};

/**
 * Add skill to wanted list
 */
exports.addWantedSkill = async (userId, skillId) => {
  await db.query(
    'INSERT INTO user_skills_wanted (user_id, skill_id) VALUES (?, ?)',
    [userId, skillId]
  );
};

/**
 * Get skills offered by a user
 */
exports.getOfferedSkillsByUser = async (userId) => {
  const [rows] = await db.query(
    `SELECT s.skill_id, s.skill_name
     FROM user_skills_offered u
     JOIN skills s ON u.skill_id = s.skill_id
     WHERE u.user_id = ?`,
    [userId]
  );
  return rows;
};

/**
 * Get skills wanted by a user
 */
exports.getWantedSkillsByUser = async (userId) => {
  const [rows] = await db.query(
    `SELECT s.skill_id, s.skill_name
     FROM user_skills_wanted u
     JOIN skills s ON u.skill_id = s.skill_id
     WHERE u.user_id = ?`,
    [userId]
  );
  return rows;
};
