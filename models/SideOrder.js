const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SideOrderSchema = new Schema({
    did: Number,
    oid: Number,
    sid: Number,
    amount: Number
});

const SideOrder = mongoose.model('SideOrder', SideOrderSchema);

module.exports = SideOrder;