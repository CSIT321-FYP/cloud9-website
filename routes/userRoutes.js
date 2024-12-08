const express = require('express');
const { handleGetUsers, handleGetUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', handleGetUsers)
router.get('/profile', handleGetUser)

module.exports = router
