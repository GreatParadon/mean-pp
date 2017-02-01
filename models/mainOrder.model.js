const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MainOrderSchema = new Schema({
    did: Number,
    oid: Number,
    mid: Number,
    type: Number
});

const MainOrder = mongoose.model('MainOrder', MainOrderSchema);

module.exports = MainOrder;