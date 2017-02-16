import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MealOrderSchema = new Schema({
    oid: String,
    uid: String,
    aid: {type: String, ref: 'Address'},
    buyer: String,
    type: String,
    timestamp: {type: Date, default: Date.now}
});

const MealOrder = mongoose.model('MealOrder', MealOrderSchema);

module.exports = MealOrder;