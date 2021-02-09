const router = require('express').Router();
const { Project, User, Topic } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const projects = await Project.findAll({
            include: {models: [User, Topic]}
        });
        res.status(201)
        res.json(projects);
    } catch (err) {
        next(err);
    }
  });
  
router.post('/create', async (req, res, next) => {
    try {
        const {name, shortName, description, instructions} = req.body;
        await Project.create({
            name, shortName, description, instructions
        });
        res.status(201);
        const projects = await Project.findAll({
            where: {userId: req.user.id}
        });
        res.json(projects);
    } catch (error) {
        next (error);
    }
});