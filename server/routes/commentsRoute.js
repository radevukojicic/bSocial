const express = require('express');
const router = express.Router();
const API = require('../controllers/commentsController')

//routes
router.post('/getCommentsForId', API.getCommentsForId)
router.post('/postComment', API.postComment)



module.exports = router;