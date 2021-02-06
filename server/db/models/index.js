const User = require('./user');
const Project = require('./project');

Project.belongsTo(User);
User.hasMany(Project);

module.exports = {
    User,
    Project
}