const router = require('express').Router();
const { Project, User } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
    try {
      const projects = await Project.findAll({
        include: {model: User}
      })
      res.status(201)
      res.json(projects);
    } catch (err) {
      next(err);
    }
  });
  
  router.post('/select', async (req, res, next) => {
    try {
      const {name, id} = req.body
      const user = await User.create({
        name: name
      })
      const project = await Project.findByPk(id, {
          include: {model: User}
      })
      if (project.numStudents < 4){
        await user.setProject(project)
        await project.update({numStudents: project.numStudents + 1})
        res.status(201);
        const projects = await Project.findAll({
            include: {model: User}
          })
        res.json(projects)
      } else {
        const projects = await Project.findAll({
            include: {model: User}
          })
          res.status(403)
          res.json(projects)
      }

    } catch (error) {
      next(error);
    }
  });