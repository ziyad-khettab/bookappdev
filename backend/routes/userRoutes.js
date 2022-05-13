const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const {auth} = require('../middlewares/authMiddleware');
const {isAdmin} = require('../middlewares/isAdminMiddleware');
router.get('/', auth, isAdmin, userController.getAllUsers)
router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/profile', auth, userController.profile)

module.exports = router;