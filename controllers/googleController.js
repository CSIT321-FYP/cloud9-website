const { google } = require('googleapis');
const crypto = require('crypto')
const User = require('../models/user');
const UserGoogle = require('../models/user_google');

// Configure OAuth2 client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);
const SCOPES = ['openid', 'email', 'profile', 'https://www.googleapis.com/auth/drive'];

async function handleSignInWithGoogle(req, res, next) {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline', // Indicates if you want a refresh token
        scope: SCOPES,
        prompt: 'consent'
    });
    res.redirect(authUrl);
}

async function handleGoogleCallback(req, res, next) {
    const code = req.query.code;

    if (!code) {
        return res.status(400).json({ message: 'Authorization code missing' });
    }
    console.log('BreakPoint 1')

    try {
        // Exchange authorization code for tokens
        const { tokens } = await oauth2Client.getToken(code);
        console.log('BreakPoint 2')

        // Set Credentials
        oauth2Client.setCredentials(tokens);
        console.log('BreakPoint 3')

        // Fetch user profile
        const { data } = await google.oauth2({ version: 'v2', auth: oauth2Client }).userinfo.get()
        console.log('BreakPoint 4')

        // TODO
        // Check if a user with the email exists
        try {
            const user = await User.getUserByEmail(data.email)
            console.log('BreakPoint 5')
            try {
                // If user exists, check if a user_google exists
                // Update refresh token
                console.log('BreakPoint 6')
                const userGoogle = await UserGoogle.getUserByEmail(user.email)
                if (tokens.refresh_token) await userGoogle.updateRefreshToken(tokens.refresh_token)

            } catch (err) {
                // Else create new user_google, link to user
                try {
                    console.log('BreakPoint 7')
                    await UserGoogle.createUser(user.id, tokens.refresh_token)
                } catch (err) {

                }
            }

        } catch (err) {
            // Else create a new user, set profile fields, create new user_google, set refresh token
            console.log('BreakPoint 8')
            const randomPassword = crypto.randomBytes(16).toString('hex'); // 32-character placeholder
            const user = await User.createUser(data.email, randomPassword, data.given_name, data.family_name)
            const userGoogle = await UserGoogle.createUser(user.id, tokens.refresh_token)
        }
        console.log('BreakPoint 9')
        res.status(201)
    } catch (err) {
        console.log('BreakPoint 10')
        console.error('Error during Google OAuth:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
    console.log('BreakPoint 11')
    res.status(201).json({ message: 'Login Successful' })
}

module.exports = {
    handleSignInWithGoogle,
    handleGoogleCallback,
}
