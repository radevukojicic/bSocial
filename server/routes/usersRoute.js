const express = require('express');
const router = express.Router();
const API = require('../controllers/usersController')

//routes
router.post('/register', API.register)
router.post('/login', API.login)
router.post('/logOut', API.logOut)

module.exports = router;