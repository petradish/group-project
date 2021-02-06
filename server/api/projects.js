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
      const {name, id} = req.body,
          project = await Project.findByPk(id);
      if (project.students.length < project.maxStudents) {
          const newStudents = [...project.students, name];
          await project.update({students: newStudents});
          res.status(201);
          const projects = await Project.findAll();
          res.json(projects);
      } else {
          const projects = await Project.findAll();
          res.status(403);
          res.json(projects);
      }

    } catch (error) {
      next (error);
    }
  });