import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SideOrderSchema = new Schema({
    did: String,
    oid: {type: String, ref: 'MealOrder'},
    sid: {type: String, ref: 'Side'},
    amount: Number
});

const SideOrder = mongoose.model('SideOrder', SideOrderSchema);

module.exports = SideOrder;