const sequelize = require("sequelize");

//db
const db = require('../models')
//Model
const post = db.post
const follow = db.follow
const user = db.users

module.exports = class API {

  
    //Get posts
    static async getPosts(req, res) {
         
        const id = req.user.id
        //Get followings for user LogedIn
        const following = await follow.findAll({
            where: {
              userId: id ,
            },
        })

        //store following  ids
        const followingIds = [];
        for(const user  of  following){
            await followingIds.push(user.followingId);     
        }
        //add user id in array
        followingIds.push(id);  



        console.log(followingIds)
        
        //Find posts for users following and order by time
        const posts = await post.findAll({
             where: { userId: followingIds },
             order: [['updatedAt', 'DESC']] })
        res.status(200).send(posts)


    }

    //Get single post
    static async getPost(req, res) {
         
      const id = req.params.postId
      //Find posts for users following and order by time
      const postSingle = await post.findOne({
           where: { id: id },
      })
      res.status(200).send(postSingle)


  }


    //Create post
    static async createPost(req, res) {
      //grabbing  data
      const content = req.body.content
      //Check if inputs are empty
      if(!content){
          return res.status(400).send({message:'Field is required!!'})
      }

      //if all is ok create post
      const newPost = await post.create({
        userId: req.user.id,
        username: req.user.username,
        email: req.user.email,
        content: content,
      })
      console.log(newPost)
      res.status(200).send({message:'Successfuly added post!!'})

    }

    //Create post
    static async nonFollowing(req, res) {

        //Get user id
        const id = req.user.id;

        //Get followings for user LogedIn
        const following = await follow.findAll({
            where: {
              userId: id ,
            },
        })


        //store following  ids
        const followingIds = [];
        for(const user  of  following){
            await followingIds.push(user.followingId);     
        }
        //add user id in array
        followingIds.push(id); 


        //Find users not following 
        const users = await user.findAll({
         where: {
          id: {
            [sequelize.Op.not]: followingIds,
          },
        },
        })
        res.status(200).send(users)

        //TODO: ADD TRY CATCH EVRYWHARE
        

    }

}