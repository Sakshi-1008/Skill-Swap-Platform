const User = require('../models/user.model');
const passwordUtil = require('../utils/password');
const jwtUtil = require('../utils/jwt');
const response = require('../utils/response');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findByEmail(email);
  if (!user) return response.error(res, 'User not found');

  const match = await passwordUtil.compare(password, user.password_hash);
  if (!match) return response.error(res, 'Invalid password');

  const token = jwtUtil.sign({ user_id: user.user_id });
  response.success(res, 'Login successful', { token });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await passwordUtil.hash(password);
  await User.create(name, email, hashed);
  response.success(res, 'Registration successful');
};
