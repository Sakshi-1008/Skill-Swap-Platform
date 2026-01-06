const express = require('express');
const router = express.Router();
const controller = require('../controllers/skill.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', controller.getAllSkills);
router.post('/offer', auth, controller.addOfferedSkill);
router.post('/want', auth, controller.addWantedSkill);
router.post('/swap', auth, controller.createSwapRequest);

module.exports = router;
