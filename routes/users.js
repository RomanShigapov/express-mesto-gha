const router = require('express').Router();
const {
  createUser,
} = require('../controllers/users');

// router.get('/users', );
// router.get('/users/:userId', );
router.post('/', createUser);

module.exports = router;
