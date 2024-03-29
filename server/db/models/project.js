const Sequelize = require('sequelize');
const db = require('../db');
const {uniqueNamesGenerator, adjectives, colors, animals} = require('unique-names-generator');

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
        unique: true
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

const getUniqueLinkName = async function () {
    let linkName, project;
    do {
        linkName = generateLinkName();
        project = await Project.findOne({
            where: {linkName}
        });
    } while (project);

    console.log(linkName);
    return linkName;
}

function generateLinkName() {
    return uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        separator: '',
        style: 'capital'
    });
}

Project.beforeCreate(async (project) => {
    const linkName = await getUniqueLinkName();
    project.linkName = linkName;
})

module.exports = Project;
