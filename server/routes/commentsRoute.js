const express = require('express');
const API = require('../controllers/commentsController')
//db
const db = require('../models')
//Model
const comments = db.comments
const post = db.post

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
    const postCommented = await post.findOne({
      where: {
        id: postId ,
      },
    })

    //sending real time notification evry time user comment
    await io.emit("comments",{comment:`${username} je  komentarisao vasu obajvu "${content}"`,id:postCommented.userId, userCommentId:userId});
    res.status(200).send({message:"Successfully posted comment"})
    })

return router
}


module.exports = SocketRouter;