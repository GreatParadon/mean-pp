// Import library
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    route = require('../config/route'),
    port = 3000,
    app = express();

// Import Database
require('./database.js');

// Server connect
app.listen(port, function () {
    console.log('Server started on port ' + port);
});

// View Engine
app.set('views', path.join(__dirname, '../dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set static folder
app.use(express.static(path.join(__dirname, '../dist')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(morgan('dev'));

// Controllers Group
controller(route.admin, '/');
controller(route.api, '/api');
function controller(arr, type) {
    for (let i of arr) {
        app.use(type, require('../controllers/' + i));

    }
}