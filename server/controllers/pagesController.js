
//db
const db = require('../models')
//Model
const post = db.post


module.exports = class API {

    //Login page
    static async Feed(req, res) {
      const user = req.user
      const posts = await post.findAll({ limit: 10, order: [['updatedAt', 'DESC']] })
      res.render('postFeed',{user:user, posts: posts})
    }
    //Login page
    static async loginPage(req, res) {
        res.render('login')
    }
    //Register page
    static async registerPage(req, res) {
        res.render('register')
    }

}