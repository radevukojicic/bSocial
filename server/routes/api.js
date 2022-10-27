//routes
const userRoute = require('./usersRoute')
const pagesRoute = require('./pagesRoute')
const feedRoute = require('./feedRoutes')
const followingRoute = require('./followingRoute')
const commentsRoute = require('./commentsRoute')
//User midddleware
const userPass = require('../middleware/userPass')
//Auth pages function
const AuthRoute = require('./authRoute')




function initRoutes(app,io) {

    //Auth pages
    app.use('/auth', AuthRoute)

    //Pages routes
    app.use('/', pagesRoute)
    

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