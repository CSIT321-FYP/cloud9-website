const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../db/db').pool; // Your database connection module

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';

passport.use(
    new JwtStrategy(opts, async (payload, done) => {
        console.log('Authenticating')
        console.log({ payload })
        try {
            const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];

            console.log(result)

            if (!user) return done(null, false, { message: 'Incorrect email or password.' });

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) return done(null, false, { message: 'Incorrect username or password.' });

            return done(null, user);
        } catch (err) {
            console.log(err)
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        done(null, result.rows[0]);
    } catch (err) {
        done(err);
    }
});

const authMiddleware = (strategy) => (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info?.message || 'Unauthorized' });

        // Attach user to request object for downstream use if needed
        req.user = user;

        // Proceed to the next middleware or handler
        next();
    })(req, res, next);
};


module.exports = authMiddleware

