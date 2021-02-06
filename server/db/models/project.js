const Sequelize = require('sequelize');
const db = require('../db');

const Project = db.define('project', {
    name: {
        type: Sequelize.STRING
    },
    students: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
    },
    maxStudentCount: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
});

module.exports = Project;
