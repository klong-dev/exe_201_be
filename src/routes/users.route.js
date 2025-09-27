const express = require('express');
const UserController = require('../controllers/users');
const router = express.Router();

// User routes
router.get('/', UserController.getAllUsers);

module.exports = router;
