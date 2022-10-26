//db
const db = require('../models')
//Model
const comments = db.comments

module.exports = class API {

    //Make a comment
    static async postComment(req, res) {

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
        
        res.status(200).send({message:"Successfully posted comment"})
  
      }

       static async getCommentsForId(req, res) {
        const postId = req.body.postId;
        const Comments = await  comments.findAll({
          where: {
            postId: postId,
          },
        })
        res.status(200).send(Comments)

    }


    

}