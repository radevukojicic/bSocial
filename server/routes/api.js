//routes
const userRoute = require('./usersRoute')

function initRoutes(app) {
    //User routes
    app.use('/user', userRoute)
}


module.exports=initRoutes