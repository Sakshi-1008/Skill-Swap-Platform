const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);
router.put('/update', auth, controller.updateProfile);

module.exports = router;
