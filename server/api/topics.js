const router = require('express').Router();
const { Project, Topic, User } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const topics = await Topic.findAll({
            include: [
                {model: Project},
                {model: User, as: 'students'}
            ]
        });
        res.status(201)
        res.json(topics);
    } catch (err) {
        next(err);
    }
});
  
router.post('/select', async (req, res, next) => {
    try {
      const {student, id} = req.body,
          topic = await Topic.findByPk(id, {
              include: [
                  {model: User, as: 'students'}
              ]
          }),
          newStudent = await User.findOne({
              where: {googleId: student.googleId}
          });
      if (topic.students.length < topic.maxStudents) {
          await topic.addStudent(newStudent);
          res.status(201);
          const topics = await Topic.findAll({
              include: [
                  {model: User, as: 'students'}
              ]
          });
          res.json(topics);
      } else {
          const topics = await Topic.findAll({
              include: [
                  {model: User, as: 'students'}
              ]
          });
          res.status(403);
          res.json(topics);
      }

    } catch (error) {
      next (error);
    }
});