const router = require('express').Router();
const { Project, Topic, User } = require('../db/models');

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
        const {name, shortName, description, instructions, maxStudents} = req.body,
            project = await Project.create({
                name, shortName, description, instructions, maxStudents
            }),
            user = await User.findByPk(req.user.id)

        await project.setUser(user);

        if (req.body.topics) {
            const newTopics = await Promise.all(req.body.topics.map(it => {
                return Topic.create({name: it});
            }));
            await project.setTopics(newTopics);
        }

        const projects = await Project.findAll({
            where: {userId: req.user.id},
            include: [Topic]
        });
        res.status(201);
        res.json(projects);
    } catch (error) {
        next (error);
    }
});


router.post('/update', async (req, res, next) => {
    try {
        const {id, name, shortName, description, instructions, linkName, maxStudents} = req.body,
            [updatedRows, [project]] = await Project.update({
                name, shortName, description, instructions, linkName, maxStudents
            }, {
                returning: true,
                where: {id}
            });

        // Only update topics if needed
        if (req.body.topics) {
            const oldTopics = await Topic.findAll({
                where: {projectId: id}
            });
            await Promise.all(oldTopics.map(it => it.destroy()));

            const newTopics = await Promise.all(req.body.topics.map(it => {
                return Topic.create({name: it});
            }));

            await project.setTopics(newTopics);
        }

        const updatedProject = await Project.findByPk(id, {include: [Topic]})

        res.status(201);
        res.json(updatedProject);
    } catch (error) {
        next (error);
    }
});

router.get('/delete/topic/:id', async (req, res, next) => {
    try {
        const topic = await Topic.findByPk(req.params.id, {include: [Project]}),
            id = topic.projectId;
        await topic.destroy();
        const updatedProject = await Project.findByPk(id, {include: [Topic]})
        res.status(201);
        res.json(updatedProject);
    } catch (err) {
        next(err);
    }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id);
        await project.destroy();
        res.status(201);
        res.json({deleted: req.params.id});
    } catch (err) {
        next(err);
    }
});