const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/getProfile', authMiddleware, userController.getProfile);
router.post('/updateProfile', authMiddleware, userController.updateProfile);

module.exports = router;
