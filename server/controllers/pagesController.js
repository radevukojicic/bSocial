const jwt = require('jsonwebtoken')
const secret = require('../config/keys').secret

module.exports = class API {

    //Login page
    static async Feed(req, res) {
      const user = req.user
      res.render('postFeed',{user:user})
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