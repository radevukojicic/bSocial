const express = require('express');
const API = require('../controllers/commentsController')
//db
const db = require('../models')
//Model
const comments = db.comments
// const user = db.users
function SocketRouter(io) {
const router = express.Router();
//routes
router.post('/getCommentsForId', API.getCommentsForId)
router.post('/postComment',async (req, res) => {

    const userId = req.user.id;
    const username = req.user.username;
    const email = req.user.email;
    
    const { postId , content} = req.body
    
    await comments.create({
        content: content,
        postId: postId,
        userId: userId,
        username: username,
        email: email,
      })
    
    await io.emit("comments",{comment:`${username} je  komentarisao vasu obajvu "${content}"`,id:1});
    res.status(200).send({message:"Successfully posted comment"})
    })

return router
}


module.exports = SocketRouter;