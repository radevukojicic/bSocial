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
         
        // const id = req.user.id
         const id = 1
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
    //Create post
    static async createPost(req, res) {
      //grabbing  data
      const {email,username,id,content} = req.body
      console.log(req.body)
      //Check if inputs are empty
      if( !email || !username || !id || !content){
          return res.status(400).send({message:'Field is required!!'})
      }

      //if all is ok create post
      const newPost = await post.create({
        userId: id,
        username: username,
        email: email,
        content: content,
      })
      console.log(newPost)
      res.status(200).send({message:'Successfuly added post!!'})

    }

    //Create post
    static async nonFollowing(req, res) {

        //Get user id
        // const id = req.user.id;
         const id = 1;

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