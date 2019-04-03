const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const extractFile = require('../middleware/profileImage');
const UserController = require('../controllers/users');

router.get('/:id', UserController.getUserProfile);
router.post('/signup', UserController.createUser);
router.post('/login', UserController.login);
router.put('/update/:id', auth, extractFile, UserController.updateProfile);

module.exports = router;
