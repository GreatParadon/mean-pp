const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    aid: Number,
    uid: Number,
    address: String
});

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;