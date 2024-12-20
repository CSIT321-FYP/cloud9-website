const express = require('express');
const router = express.Router();
const { handleSignInWithGoogle, handleGoogleCallback, handleGetAccessToken, handleGetUserProfile, handleGetDriveFiles, handleGetDriveFile, handleUploadFile, handleDownloadFile } = require('../controllers/googleController');
const authenticateJWT = require('../middleware/authMiddleware');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/', handleSignInWithGoogle);

// Google Auth
router.get('/callback', handleGoogleCallback);

router.get('/token', authenticateJWT, handleGetAccessToken);
router.get('/profile', handleGetUserProfile);
router.post('/drive/files', authenticateJWT, handleGetDriveFiles)
router.post('/drive/file', authenticateJWT, handleGetDriveFile)
router.post('/drive/upload', authenticateJWT, upload.single('file'), handleUploadFile)
router.get('/drive/download/:fileId', authenticateJWT, handleDownloadFile)

module.exports = router
