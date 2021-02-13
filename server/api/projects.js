const router = require('express').Router();
const { Project, User, Topic } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const projects = await Project.findAll({
            include: [User, Topic]
        });
        res.status(201)
        res.json(projects);
    } catch (err) {
        next(err);
    }
});

router.get('/:linkName', async (req, res, next) => {
    try {
        const project = await Project.findOne({
            where: {
                linkName: req.params.linkName
            },
            include: [{
                model: Topic,
                include: [{model: User, as: 'students', attributes: ['name', 'googleId']}]
            }]
        });
        res.status(201)
        res.json(project);
    } catch (err) {
        next(err);
    }
});

router.get('/all/mine', async (req, res, next) => {
    try {
        const projects = await Project.findAll({
            where: {
                userId: req.user.id
            },
            include: [User, Topic]
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
            where: {userId: req.user.id},
            include: [Topic]
        });
        res.json(projects);
    } catch (error) {
        next (error);
    }
});


router.post('/update', async (req, res, next) => {
    try {
        const {id, name, shortName, description, instructions, linkName, topics} = req.body,
            [updatedRows, [project]] = await Project.update({
            name, shortName, description, instructions, linkName
        }, {where: {id}});

        const newTopics = await Promise.all(topics.map(it => {
            return Topic.create(it);
        }))
        project.setTopics(newTopics);

        const updatedProject = await Project.findByPk(id, {include: [Topic]})
        res.status(201);

        res.json(updatedProject);
    } catch (error) {
        next (error);
    }
});

router.get('/delete', async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.body.id);
        await project.destroy();
        res.status(201);
        res.json({deleted: req.body.id});
    } catch (err) {
        next(err);
    }
});