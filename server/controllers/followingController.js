//db
const db = require('../models')
//Model
const follow = db.follow

module.exports = class API {

    //Make a follow
    static async follow(req, res) {
   
        const userId = req.user.id;
        const followingId = req.body.id;

        //Create following 
        await follow.create({
           userId: userId,
           followingId: followingId,
        })
     
        res.status(200).send({message:"Successfully followed user"})
  
      }

}