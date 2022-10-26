const express = require('express');
const router = express.Router();
const API = require('../controllers/feedController')

//routes
router.get('/getPosts', API.getPosts)
router.get('/getPost/:postId', API.getPost)
router.get('/nonFollowing', API.nonFollowing)
router.post('/createPost', API.createPost)


module.exports = router;