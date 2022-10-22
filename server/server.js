//Modules
const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// Initialize the app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// set the view engine to ejs
app.set('view engine', 'ejs');

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