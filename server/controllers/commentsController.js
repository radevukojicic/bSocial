//db
const db = require('../models')
//Model
const comments = db.comments

module.exports = class API {

    //Make a comment

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