import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SideSchema = new Schema({
    sid: String,
    title: String,
    detail: String,
    producer: String,
    information: String,
    utility: String,
    price: Number,
    image: String,
    dish_image: String,
    disable: Number,
    timestamp: {type: Date, default: Date.now}
});

const Side = mongoose.model('Side', SideSchema);

module.exports = Side;