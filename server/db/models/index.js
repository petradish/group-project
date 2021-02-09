const User = require('./user');
const Project = require('./project');
const Topic = require('./topic');

Project.belongsTo(User);
User.hasMany(Project);
Topic.belongsTo(Project);
Project.hasMany(Topic);
Topic.hasMany(User, {as: 'students', constraints: false, allowNull: true, defaultValue: null});

module.exports = {
    User,
    Project,
    Topic
}