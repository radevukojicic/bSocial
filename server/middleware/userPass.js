const jwt = require('jsonwebtoken')
const secret = require('../config/keys').secret

module.exports = async function (req, res, next) {

    //Check if token exist
    const token = await req.cookies.token;
    if(!token) return res.redirect('/login')
    try {

        //Check if token secret is correct
        const verifiedToken = jwt.verify(token,secret)
        if(!verifiedToken) return res.redirect('/login')

        //Get user info from token
        req.user = verifiedToken
        
        //If all is ok route can continue
        next()
    } catch (error) {
        res.send(error)
    }
}