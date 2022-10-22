const express = require('express');
const router = express.Router();
const API = require('../controllers/pagesController')
//User midddleware
const userPass = require('../middleware/userPass')
//Already Login midddleware
const alreadyLogin = require('../middleware/alreadyLogin')

//routes
router.get('/', userPass,  API.Feed)
router.get('/login', alreadyLogin , API.loginPage)
router.get('/register', alreadyLogin, API.registerPage)

module.exports = router;