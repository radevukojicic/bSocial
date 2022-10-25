const jwt = require('jsonwebtoken')
const secret = require('../config/keys').secret

module.exports = async function (req, res, next) {

    //Check if token exist
    const token = await req.headers.authorization;
    if(!token) return res.status(401).send("Unauthorized")
    try {

        //Check if token secret is correct
        const verifiedToken = jwt.verify(token,secret)
        if(!verifiedToken) return res.status(401).send("Unauthorized token")

        //Get user info from token
        req.user = verifiedToken
        
        //If all is ok route can continue
        next()
    } catch (error) {
        res.send(error)
    }
}