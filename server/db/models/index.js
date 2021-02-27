const User = require('./user');
const Classroom = require('./classroom');
const Project = require('./project');
const Topic = require('./topic');

User.hasMany(Classroom);
Classroom.belongsTo(User, {onDelete: 'cascade'});

Classroom.hasMany(Project);
Project.belongsTo(Classroom, {onDelete: 'cascade'});

Project.hasMany(Topic);
Topic.belongsTo(Project, {onDelete: 'cascade'});

Classroom.hasMany(User, {as: 'students', constraints: false, allowNull: true, defaultValue: null})
Topic.hasMany(User, {as: 'students', constraints: false, allowNull: true, defaultValue: null});

module.exports = {
    User,
    Classroom,
    Project,
    Topic
}