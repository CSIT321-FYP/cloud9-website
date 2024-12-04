const express = require('express');
const { handleGetUsers } = require('../controllers/userController');
const router = express.Router();

router.get('/', handleGetUsers)

module.exports = router
