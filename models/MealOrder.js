const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealOrderSchema = new Schema({
    oid: String,
    uid: String,
    aid: String,
    buyer: String,
    type: Number,
    timestamp: {type: Date, default: Date.now}
});

const MealOrder = mongoose.model('MealOrder', MealOrderSchema);

module.exports = MealOrder;