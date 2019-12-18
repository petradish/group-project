const User = require('./user');
const Project = require('./project');


User.belongsTo(Project);
Project.hasMany(User);

module.exports = {
    User,
    Project
}