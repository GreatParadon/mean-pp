import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: String,
    password: String,
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;