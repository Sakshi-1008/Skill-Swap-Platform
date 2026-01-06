const response = require('../utils/response');

/**
 * Validate required fields in req.body
 * Example usage:
 * validate(['email', 'password'])
 */
module.exports = (requiredFields = []) => {
  return (req, res, next) => {
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return response.error(res, `${field} is required`);
      }
    }
    next();
  };
};
