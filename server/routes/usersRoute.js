const express = require('express');
const router = express.Router();
const API = require('../controllers/usersController')

//routes
router.post('/register', API.register)

module.exports = router;