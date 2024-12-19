const { google } = require('googleapis');
const crypto = require('crypto')
const User = require('../models/user');
const UserGoogle = require('../models/user_google');
const jwt = require('jsonwebtoken')
// Configure OAuth2 client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);
const SCOPES = ['openid', 'email', 'profile', 'https://www.googleapis.com/auth/drive'];

async function handleSignInWithGoogle(req, res, next) {
    const { redirect_uri } = req.query

    if (!redirect_uri) {
        return res.status(400).json({ error: 'Missing redirect_uri' });
    }

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline', // Indicates if you want a refresh token
        scope: SCOPES,
        prompt: 'consent',
        state: redirect_uri,
    });
    res.redirect(authUrl);
}

async function handleGoogleCallback(req, res, next) {
    const { code, state } = req.query;
    let user;

    if (!code) {
        return res.status(400).json({ message: 'Authorization code missing' });
    }

    try {
        // Exchange authorization code for tokens
        const { tokens } = await oauth2Client.getToken(code);

        // Set Credentials
        oauth2Client.setCredentials(tokens);

        // Fetch user profile
        const { data } = await google.oauth2({ version: 'v2', auth: oauth2Client }).userinfo.get()

        // TODO
        // Check if a user with the email exists
        try {
            user = await User.getUserByEmail(data.email)
            try {
                // If user exists, check if a user_google exists
                // Update refresh token
                const userGoogle = await UserGoogle.getUserByEmail(user.email)
                if (tokens.refresh_token) await userGoogle.updateRefreshToken(tokens.refresh_token)

            } catch (err) {
                // Else create new user_google, link to user
                try {
                    await UserGoogle.createUser(user.id, tokens.refresh_token)
                } catch (err) {

                }
            }

        } catch (err) {
            // Else create a new user, set profile fields, create new user_google, set refresh token
            const randomPassword = crypto.randomBytes(16).toString('hex'); // 32-character placeholder
            user = await User.createUser(data.email, randomPassword, data.given_name, data.family_name)
            const userGoogle = await UserGoogle.createUser(user.id, tokens.refresh_token)
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }

    // Generate JWT
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    },
        process.env.JWT_SECRET
    );


    // Redirect to the original `redirect_uri` with a session token or status
    const frontendRedirectURL = `${state}?status=success&token=${encodeURIComponent(token)}`;
    res.redirect(frontendRedirectURL);
}

async function handleGetAccessToken(req, res, next) {
    const { user } = req

    if (!user) res.status(401).json({ error: 'Unauthorized' })

    const userGoogle = await UserGoogle.getUserByEmail(user.email);

    try {
        // Set the refresh token in the OAuth2 client
        oauth2Client.setCredentials({ refresh_token: userGoogle.refreshToken });

        // Get the new access token
        const credentials = (await oauth2Client.getAccessToken()).res.data;
        console.log(credentials)

        // Return the access token
        res.json({ access_token: credentials.access_token, expiry_date: credentials.expiry_date })
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw new Error('Unable to refresh access token');
    }

}

async function handleGetUserProfile(req, res, next) {
    const { access_token } = req.body
    if (!access_token) res.status(400).send("No access token")

    try {
        // Set the refresh token in the OAuth2 client
        oauth2Client.setCredentials({ access_token: access_token });

        // Fetch user profile
        const { data } = await google.oauth2({ version: 'v2', auth: oauth2Client }).userinfo.get()

        // Return user profile
        res.json(data)
    } catch (error) {
        console.error('Error refreshing access token:', error);
        next(error)
    }
}

module.exports = {
    handleSignInWithGoogle,
    handleGoogleCallback,
    handleGetAccessToken,
    handleGetUserProfile,
}
