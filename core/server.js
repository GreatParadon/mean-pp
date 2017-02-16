// Import library
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import chalk from 'chalk';
import ejs from 'ejs';
require('./database');

const port = 4000,
    app = express();

// Server connect
app.listen(port, () => {
    console.log(chalk.green(`Server started on port ${port}`));
});

// View Engine
const viewsPath = path.join(__dirname, '../public');
app.set('views', viewsPath);
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

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