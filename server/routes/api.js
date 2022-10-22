//routes
const userRoute = require('./usersRoute')
const pagesRoute = require('./pagesRoute')

function initRoutes(app) {
    //Pages routes
    app.use('/', pagesRoute)

    //User routes
    app.use('/user', userRoute)
}


module.exports=initRoutes