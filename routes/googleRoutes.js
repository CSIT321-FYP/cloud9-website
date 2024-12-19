const express = require('express');
const router = express.Router();
const { handleSignInWithGoogle, handleGoogleCallback, handleGetAccessToken, handleGetUserProfile } = require('../controllers/googleController');
const authenticateJWT = require('../middleware/authMiddleware');

router.get('/', handleSignInWithGoogle);

// Google Auth
router.get('/callback', handleGoogleCallback);

router.get('/token', authenticateJWT, handleGetAccessToken);
router.get('/profile', handleGetUserProfile);

module.exports = router
