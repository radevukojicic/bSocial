//Modules
const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// Initialize the app
const app = express();

// socket
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// set the view engine to ejs
app.set('view engine', 'ejs');

//Setting up the static directory
app.use(express.static(path.join(__dirname, 'public')))

//Middlewear for working with cookies
app.use(cookieParser())

//Cors middlewear
app.use(cors());

  


//init routes
require('./routes/api')(app,io)


// socket connection
io.on("connection", (socket) => {
    console.log("SOCKET connected");
});

  
//Connecting to port and starting server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})