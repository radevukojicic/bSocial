//db
const db = require('../models')
//Model
const post = db.post

module.exports = class API {

    //Create post
    static async getPosts(req, res) {
        const posts = await post.findAll({ limit: 10, order: [['updatedAt', 'DESC']] })
        res.status(200).send(posts)
  
      }
    //Create post
    static async createPost(req, res) {
      //grabbing  data
      const {email,username,id, content } = req.body
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

}