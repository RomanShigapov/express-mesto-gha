const router = require('express').Router();
const {
  createUser,
  getUsers,
  getUserById,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);

// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар

module.exports = router;
