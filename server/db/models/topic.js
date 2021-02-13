const Sequelize = require('sequelize');
const db = require('../db');

const Topic = db.define('topic', {
    name: {
        type: Sequelize.STRING
    }
});

module.exports = Topic;
