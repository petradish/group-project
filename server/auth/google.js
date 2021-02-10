const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {User} = require('../db/models');
module.exports = router;

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.log('Google client ID / secret not found. Skipping Google OAuth.');
} else {
    const googleConfig = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    };

    passport.use('google',
        new GoogleStrategy(
        googleConfig,
        (token, refreshToken, profile, done) => {
            const googleId = profile.id;
            const name = profile.displayName;

            User.findOrCreate({
                where: {googleId},
                defaults: {name}
            })
                .then(([user]) => done(null, user))
                .catch(done)
        }
    ));

    router.get('/callback',
        passport.authenticate('google', {failureRedirect: '/login'}),
        (req, res) => {
            try {
                const state = req.query.state;
                if (typeof state === 'string') {
                    return res.redirect('/' + state);
                }
            } catch {
                console.error('Redirect Failed.')
            }
            res.redirect('/');
        }
    );


    router.get('/:linkName?',
        (req, res, next) => {
            const linkName = req.params.linkName;

            passport.authenticate('google', {
                scope: ['https://www.googleapis.com/auth/plus.login'],
                state: linkName
            })(req, res, next);
        }
    );
}