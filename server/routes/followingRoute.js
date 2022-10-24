const express = require('express');
const router = express.Router();
const API = require('../controllers/followingController')


//routes
router.post('/follow',  API.follow)


module.exports = router;