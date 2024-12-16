const express = require('express');
const router = express.Router();
const { google } = require('googleapis');

// Configure OAuth2 client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);
const SCOPES = ['openid', 'email', 'profile', 'https://www.googleapis.com/auth/drive'];

router.get('/', (req, res, next) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline', // Indicates if you want a refresh token
        scope: SCOPES,
    });
    res.redirect(authUrl);
});

// Google Auth
router.get('/callback', async (req, res, next) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).json({ message: 'Authorization code missing' });
    }

    try {
        // Exchange authorization code for tokens
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const drive = google.drive({ version: 'v3', auth: oauth2Client });
        const result = await drive.files.listLabels({fileId: '1uwjmEHB5odXpZzc4dO3ec6_Vt5f6Ji-coUkOYSOnEos'});

        const { data } = result;

        console.log(result)
        res.json(data.files)
    } catch (err) {
        console.error('Error during Google OAuth:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router
