const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true
  },
  googleId: {
    type: Sequelize.STRING
  }
});

module.exports = User;
