const Sequelize = require('sequelize');
const db = require('../db');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

function generateLinkName() {
    return uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        separator: '',
        style: 'capital'
    });
}

async function getUniqueLinkName() {
    let linkName, project;
    do {
        linkName = generateLinkName();
        project = await Project.findOne({
            where: {linkName}
        });
    } while (project);

    return linkName;
}

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
        unique: true,
        defaultValue: () => getUniqueLinkName()
    },
    maxStudents: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    description: {
        type: Sequelize.TEXT
    },
    instructions: {
        type: Sequelize.TEXT
    }
});

module.exports = Project;
