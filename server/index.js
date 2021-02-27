const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require('./db/index');
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({db})

const PORT = process.env.PORT || 5000;
const app = express();
const socketio = require('socket.io');

module.exports = app;

if (process.env.NODE_ENV !== 'production') require('../secret')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.models.user.findByPk(id)
        done(null, user)
    } catch (err) {
        done(err)
    }
});

const createApp = () => {
    // static middleware
    app.use(express.static(path.join(__dirname, '..', 'node_modules')));
    app.use(express.static(path.join(__dirname, '..', 'public')));
    // body parsing middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    // session middleware with passport
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            store: sessionStore,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60 * 60 * 1000,
                expires: new Date(Date.now() + 60 * 60 * 1000)
            }
        })
    )
    app.use(passport.initialize());
    app.use(passport.session());
    // auth and api routes
    app.use('/auth', require('./auth'))
    app.use('/api', require('./api'));
    // send index.html
    app.use(express.static(path.join(__dirname, '..', 'client/build')));
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
    });
    app.use((req, res, next) =>
        path.extname(req.path).length > 0 ?
            res.status(404).send('Not found') :
            next()
    );
    // error handling endware
    app.use((err, req, res, next) =>
        res.status(err.status || 500).send(err.message || 'Internal server error.'));
}

const syncDb = () => db.sync().then(() => console.log('Database is synced'));

const startListening = () => {
    const server = app.listen(PORT, () =>
        console.log(`Listening on port ${PORT}`)
    );
    // set up our socket control center
    const io = socketio(server);
    require('./socket')(io);
}

async function bootApp() {
    await sessionStore.sync();
    await syncDb();
    await createApp();
    startListening();
}

if (require.main === module) {
    bootApp();
} else {
    createApp();
}
