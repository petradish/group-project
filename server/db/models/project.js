const Sequelize = require('sequelize');
const db = require('../db');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const linkName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '',
    style: 'capital'
});

const Project = db.define('project', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    shortName: {
        type: Sequelize.STRING
    },
    linkName: {
        type: Sequelize.STRING,
        defaultValue: linkName
    },
    description: {
        type: Sequelize.TEXT
    },
    instruction: {
        type: Sequelize.TEXT
    }
});

module.exports = Project;
