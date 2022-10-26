const jwt = require('jsonwebtoken')
const secret = require('../config/keys').secret
module.exports = function(req, res, next){
    const token = req.body.token
    console.log(req.body.token)
    if(!token) return res.status(400).send("Unauthorized")

    //Check if token secret is correct
    const verifiedToken = jwt.verify(token,secret)
    if(!verifiedToken) return res.status(400).send("Unauthorized")

    //If all is ok route can continue
    res.status(200).send("Success")
}