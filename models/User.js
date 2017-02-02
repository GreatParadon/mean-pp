const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
        email: String,
        password: String,
        pin: String,
        code: String,
        firstname: String,
        lastname: String,
        favorite: String,
        token: String,
        timestamp: {type: Date, default: Date.now}
    });

const User = mongoose.model('User', UserSchema);

module.exports = User;