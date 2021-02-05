const Sequelize = require('sequelize');
const db = require('../db');

const Project = db.define('project', {
  name: {
    type: Sequelize.STRING
  },
  numStudents: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      validate: {
          max: 1
      }
  }
});

module.exports = Project;
