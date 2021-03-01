const router = require('express').Router();
const {Classroom, Project, Topic, User} = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const classrooms = await Classroom.findAll({
            include: [
                User,
                Project,
                {
                    model: User,
                    as: 'students',
                    attributes: ['name', 'googleId']
                }
            ]
        });
        res.status(201)
        res.json(classrooms);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const classroom = await Classroom.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Project,
                    include: [
                        {
                            model: Topic,
                            include: [
                                {
                                    model: User,
                                    as: 'students',
                                    attributes: ['name']
                                }
                            ]
                        }
                    ]
                },
                {
                    model: User,
                    as: 'students',
                    attributes: ['name', 'googleId']
                }
            ]
        });
        res.status(201)
        res.json(classroom);
    } catch (err) {
        next(err);
    }
});

router.get('/all/mine', async (req, res, next) => {
    try {
        const classrooms = await Classroom.findAll({
            where: {
                userId: req.user.id
            },
            include: [
                {
                    model: Project,
                    include: [
                        {
                            model: Topic,
                            include: [
                                {
                                    model: User,
                                    as: 'students',
                                    attributes: ['name']
                                }
                            ]
                        }
                    ]
                },
                {
                    model: User,
                    as: 'students',
                    attributes: ['name', 'googleId']
                }
            ]
        });
        res.status(201)
        res.json(classrooms);
    } catch (err) {
        next(err);
    }
});

router.post('/create', async (req, res, next) => {
    try {
        const {name, description} = req.body,
            classroom = await Classroom.create({
                name, description
            }),
            user = await User.findByPk(req.user.id)

        await classroom.setUser(user);

        res.status(201);
        res.json(classroom);
    } catch (error) {
        next(error);
    }
});


router.post('/update', async (req, res, next) => {
    try {
        const {id, name, description} = req.body,
            [updatedRows, [classroom]] = await Classroom.update({
                name, description
            }, {
                returning: true,
                where: {id},
                include: [
                    {
                        model: Project,
                        include: [
                            {
                                model: Topic,
                                include: [
                                    {
                                        model: User,
                                        as: 'students',
                                        attributes: ['name']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: User,
                        as: 'students',
                        attributes: ['name', 'googleId']
                    }
                ]
            });

        res.status(201);
        res.json(classroom);
    } catch (error) {
        next(error);
    }
});

router.post('/delete/student/:id', async (req, res, next) => {
    try {
        const classroom = await Classroom.findByPk(req.params.id);
        const student = await Classroom.findByPk(req.body.id);

        await classroom.removeStudent(student);
        const updatedClassroom = await Classroom.findByPk(id, {
            include: [
                {
                    model: Project,
                    include: [
                        {
                            model: Topic,
                            include: [
                                {
                                    model: User,
                                    as: 'students',
                                    attributes: ['name']
                                }
                            ]
                        }
                    ]
                },
                {
                    model: User,
                    as: 'students',
                    attributes: ['name', 'googleId']
                }
            ]
        })
        res.status(201);
        res.json(updatedClassroom);
    } catch (err) {
        next(err);
    }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
        const classroom = await Classroom.findByPk(req.params.id);
        await classroom.destroy();
        res.status(201);
        res.json({deleted: req.params.id});
    } catch (err) {
        next(err);
    }
});