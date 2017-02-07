const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SideOrderSchema = new Schema({
    did: String,
    oid: String,
    sid: String,
    amount: Number
});

const SideOrder = mongoose.model('SideOrder', SideOrderSchema);

module.exports = SideOrder;