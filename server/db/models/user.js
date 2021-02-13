const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  googleId: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  school: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.ENUM('user', 'admin')
  }
});

module.exports = User;