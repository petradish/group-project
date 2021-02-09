const Sequelize = require('sequelize');
const db = require('../db');

const Topic = db.define('topic', {
    name: {
        type: Sequelize.STRING
    },
    maxStudents: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
});

module.exports = Topic;
