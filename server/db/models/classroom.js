const Sequelize = require('sequelize');
const db = require('../db');

const Classroom = db.define('classroom', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    }
});

module.exports = Classroom;
