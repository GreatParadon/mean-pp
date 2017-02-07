const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MainOrderSchema = new Schema({
    did: String,
    oid: String,
    mid: String,
    type: Number
});

const MainOrder = mongoose.model('MainOrder', MainOrderSchema);

module.exports = MainOrder;