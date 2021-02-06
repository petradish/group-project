const router = require('express').Router()
module.exports = router

//Logs out a user, deletes the session
router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/me', (req, res) => {
    res.json(req.user);
});

router.use('/google', require('./google'));