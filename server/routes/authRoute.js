const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth')

//routes
router.post('/auth', Auth)



module.exports = router;