import database from '../config/database.js';
import chalk from 'chalk';
const db_ip = database.db_ip,
    db_port = database.db_port,
    db_name = database.db_name,
    db_user = database.db_user,
    db_pass = database.db_pass;

let dbFullUrl = 'mongodb://';
const dbUrlWithDBName = `${db_ip}:${db_port}/${db_name}`;
const dbUserPwd = `${db_user}:${db_pass}@`;

if (!db_user) {
    dbFullUrl += dbUrlWithDBName;
} else {
    dbFullUrl += dbUserPwd + dbUrlWithDBName;
}

console.log(chalk.green(`DB connection url => ${dbFullUrl}`));

import mongoose from'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect(dbFullUrl, (err) => {
    if (err) {
        console.log(chalk.red('Connection failed', err));
    } else {
        console.log(chalk.green('DB Connected'));
    }
});
mongoose.connection;