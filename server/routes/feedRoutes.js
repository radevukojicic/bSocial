const express = require('express');
const router = express.Router();
const API = require('../controllers/feedController')

//routes
router.get('/getPosts', API.getPosts)
router.post('/createPost', API.createPost)


module.exports = router;