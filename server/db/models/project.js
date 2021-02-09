const Sequelize = require('sequelize');
const db = require('../db');

const Project = db.define('project', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    shortName: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    instruction: {
        type: Sequelize.TEXT
    }
});

module.exports = Project;
