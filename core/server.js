// Import library
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    port = 4000,
    app = express();

// Database Connection
require('./database.js');

// Server connect
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// View Engine
const viewsPath = path.join(__dirname, '../public');
app.set('views', viewsPath);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set static folder
app.use(express.static(viewsPath));
app.use(express.static(viewsPath + '/admin/js'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(morgan('dev'));

// Define Route
app.use('/api', require('../routes/api'));
app.use('/', require('../routes/admin'));