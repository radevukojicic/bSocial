//routes
const userRoute = require('./usersRoute')
const feedRoute = require('./feedRoutes')
const followingRoute = require('./followingRoute')
const commentsRoute = require('./commentsRoute')
//User midddleware
const userPass = require('../middleware/userPass')





function initRoutes(app,io) {

    //User routes
    app.use('/user', userRoute)

    //Feed routes
    app.use('/feed', userPass,   feedRoute)

    //Following routes
    app.use('/following',userPass,   followingRoute)

    //Comments route
    app.use('/comments',userPass, commentsRoute(io))

    
}


module.exports=initRoutes