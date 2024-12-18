const express = require('express');
const router = express.Router();
const { handleSignInWithGoogle, handleGoogleCallback } = require('../controllers/googleController');

router.get('/', handleSignInWithGoogle);

// Google Auth
router.get('/callback', handleGoogleCallback);

module.exports = router
