const router = require('express').Router();
const { Project, Topic, User } = require('../db/models');

module.exports = router;

router.get('/:projectId', async (req, res, next) => {
    try {
        const topics = await Topic.findAll({
            where: {
                projectId: req.params.projectId
            },
            include: [
                {model: Project, attributes: ['id', 'name', 'maxStudents']},
                {model: User, as: 'students', attributes: ['name', 'googleId']}
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
                  {model: Project, attributes: ['maxStudents']},
                  {model: User, as: 'students'}
              ]
          }),
          newStudent = await User.findOne({
              where: {googleId: student.googleId}
          });
      if (topic.students.length < topic.project.maxStudents) {
          await topic.addStudent(newStudent);

          const allTopics = await Topic.findAll({
              include: [
                  {model: User, as: 'students', attributes: ['name', 'googleId']}
              ]
          }),
            selectedTopic = await Topic.findByPk(id, {
                include: [
                    {model: User, as: 'students', attributes: ['name', 'googleId']}
                ]
            })

          res.status(201);
          res.json({allTopics, selectedTopic});
      } else {
          res.status(403);
          res.json(topic);
      }

    } catch (error) {
      next (error);
    }
});