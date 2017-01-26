const database = require('../config/database.js'),
    db_ip = database.db_ip,
    db_port = database.db_port,
    db_name = database.db_name,
    db_user = database.db_user,
    db_pass = database.db_pass;

let dbFullUrl = 'mongodb://';
const dbUrlWithDBName = db_ip + ':' + db_port + '/' + db_name;
const dbUserPwd = db_user + ':' + db_pass + '@';

if (!db_user) {
    dbFullUrl += dbUrlWithDBName;
} else {
    dbFullUrl += dbUserPwd + dbUrlWithDBName;
}

console.log('DB connection url => ' + dbFullUrl);

const mongoose = require('mongoose');
mongoose.connect(dbFullUrl, (err) => {
    if (err) {
        console.log('Connection failed ${err}');
    } else {
        console.log('DB Connected');
    }
});
const db = mongoose.connection;

module.exports = db;