const permit = require('../permission')
const router = require('express').Router();

router.get(['/users'], permit('admin'));

router.put(['/users', '/users:id'], permit('admin'), (req, res) =>
    res.json({message: 'updated'})
);
router.delete(['/users', '/users:id'], permit('admin'), (req, res) =>
    res.json({message: 'deleted'})
);

// all other routes available to public
router.use('/projects', require('./projects'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});

module.exports = router;
