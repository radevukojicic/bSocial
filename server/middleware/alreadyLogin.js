module.exports = async function (req, res, next) {
    try {
        //Check if token exist
        const token = await req.cookies.token;
        //Check if token secret is correct
        if(token) return res.redirect('/feed')
        //If all is ok route can continue
        next()
    } catch (error) {
        res.send(error)
    }
}