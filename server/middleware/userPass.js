const jwt = require('jsonwebtoken')
const secret = require('../config/keys').secret

module.exports = function (req, res, next) {

    //Check if token exist
    const token = await req.cookies.token;
    if(!token) return res.status(401).send("Access Denied")
    try {
        //Check if token secret is correct
        const verifiedToken = jwt.verify(token,secret)
        if(!verifiedToken) return res.status(401).send("Access Denied")

        //If all is ok route can continue
        next()
    } catch (error) {
        res.send(error)
    }
}