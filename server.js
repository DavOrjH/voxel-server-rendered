//aditional features for database support
require('rootpath')();
var cors = require('cors');
var expressJwt = require('express-jwt');
var config = require('config.json');
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
// mail support

const email = require("emailjs");


// Get our API routes
const api = require('./server/routes/api');

// Firebase handler

// firebase
var firebase = require("firebase")

//helmet for security
var helmet = require("helmet");

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyAQMGloKiNcA9TXNCryiKWvMowdtbeMt8k",
    authDomain: "voxel3d-f79d8.firebaseapp.com",
    databaseURL: "https://voxel3d-f79d8.firebaseio.com",
    projectId: "voxel3d-f79d8",
    storageBucket: "voxel3d-f79d8.appspot.com",
    messagingSenderId: "451536827730",
    secret:"El_arte de amarte"
};
firebase.initializeApp(config);
firebase.auth().signInWithEmailAndPassword("daor1590@hotmail.com","consulting804").catch(
    function(error){
        console.error(error);
    }
).then(
    ()=>{
        /// nothing yet
    }
);

var database = firebase.database();
// var nodemailer = require("nodemailer");

const router = express.Router();
const app = express();

app.use(function(req,res,next){
    req.db = database;
    req.email = email;
    next();
});
app.use(helmet());
// Parsers for POST data
app.use(cors()); // new for database support
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/apis', api);
app.use('/users', require('./controllers/users.controller'));// new for database support

// authentication encrypt -- new for database support
app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate', '/users/register'] }));

router.post("/ApiP", function(req,res){
    res.send("post works");
});
app.use("/ApiP",router);


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8080';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
