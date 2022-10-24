//routes
const userRoute = require('./usersRoute')
const pagesRoute = require('./pagesRoute')
const feedRoute = require('./feedRoutes')
//User midddleware
const userPass = require('../middleware/userPass')

function initRoutes(app) {
    //Pages routes
    app.use('/', pagesRoute)

    //User routes
    app.use('/user', userRoute)

    //Feed routes
    app.use('/feed',   feedRoute)
}


module.exports=initRoutes