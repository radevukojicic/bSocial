module.exports = async function (req, res, next) {
    try {
        //Check if token exist
        const token = await req.cookies.token;
        //If token exist dont allow access to login/register page
        if(token) return res.redirect('/')
        //If all is ok route can continue
        next()
    } catch (error) {
        res.send(error)
    }
}