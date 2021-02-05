const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const db = require('./db/index');

const PORT = process.env.PORT || 5000;
const app = express();
const server = app.listen(PORT, () => console.log(`Connected on port ${PORT}`));
// const server = require('http').createServer(app);
const socketio = require('socket.io');

// handle sockets
const io = socketio(server);
require('./socket')(io);

module.exports = app;

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secret.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
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

db.sync().then(() => console.log('Database is synced'));

// static middleware

app.use(express.static(path.join(__dirname, '..', 'node_modules')));
app.use(express.static(path.join(__dirname, '..', 'public')));

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'));

// send index.html
app.use(express.static(path.join(__dirname, '..', 'client/build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
});



// app.use(express.static(path.join(__dirname, 'client/build')));

// if (process.env.NODE_ENV === 'production') {  
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   app.get('*', (req, res) => res.sendfile(path.join(__dirname = 'client/build/index.html')))
// }
// app.get('*', (req, res) => {  res.sendFile(path.join(__dirname +'/client/public/index.html'));})
// 404 middleware
app.use((req, res, next) =>
  path.extname(req.path).length > 0 ?
    res.status(404).send('Not found') :
    next()
);

// error handling endware
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.'));
