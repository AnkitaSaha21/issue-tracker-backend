const express = require('express');
const { registerUser, loginUser, makeAdmin, getUsers } = require('../controllers/authController');
const checkRole = require('../middlewares/checkRole');
const authMiddleware = require('../middlewares/authMiddleware');
const checkUserType = require('../middlewares/checkUserType');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/make-admin', authMiddleware, checkRole('admin'), makeAdmin);
router.get('/users', authMiddleware, checkUserType('manager'), getUsers)

module.exports = router;
