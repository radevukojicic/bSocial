//Modules
const express = require('express')
const path = require('path')
const cors = require('cors')
var cookieParser = require('cookie-parser')



// Initialize the app
const app = express();

//Parsing JSON bodies with express JSON
app.use(express.json()); 

//Setting up the static directory
app.use(express.static(path.join(__dirname, 'public')))

//Cors middlewear
app.use(cors())

//Middlewear for working with cookies
app.use(cookieParser())

//init routes
require('./routes/api')(app)



//Connecting to port and starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})