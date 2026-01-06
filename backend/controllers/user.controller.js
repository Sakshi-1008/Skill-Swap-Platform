const db = require('../config/db');
const response = require('../utils/response');

/**
 * GET all public users
 */
exports.getAllUsers = async (req, res) => {
  const [users] = await db.query(
    'SELECT user_id, name, email, location, profile_photo FROM users WHERE is_public = 1'
  );
  response.success(res, 'Users fetched', users);
};

/**
 * GET single user profile
 */
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  const [[user]] = await db.query(
    'SELECT user_id, name, email, location, profile_photo FROM users WHERE user_id = ?',
    [id]
  );

  if (!user) return response.error(res, 'User not found');

  response.success(res, 'User profile', user);
};

/**
 * UPDATE user profile
 */
exports.updateProfile = async (req, res) => {
  const { name, location, is_public } = req.body;
  const userId = req.user.user_id;

  await db.query(
    'UPDATE users SET name = ?, location = ?, is_public = ? WHERE user_id = ?',
    [name, location, is_public, userId]
  );

  response.success(res, 'Profile updated');
};
