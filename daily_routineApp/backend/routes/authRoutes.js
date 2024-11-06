const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// POST /api/login - Login user
router.post('/api/login', authController.login);

module.exports = router;
