import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MainOrderSchema = new Schema({
    did: String,
    oid: {type: String, ref: 'MealOrder'},
    mid: {type: String, ref: 'Main'},
    type: Number
});

const MainOrder = mongoose.model('MainOrder', MainOrderSchema);

module.exports = MainOrder;