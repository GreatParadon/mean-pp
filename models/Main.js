import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MainSchema = new Schema({
    mid: String,
    title: String,
    detail: String,
    producer: String,
    information: String,
    utility: String,
    price: Number,
    image: String,
    dish_image: String,
    sidedish: String,
    disable: Number,
    timestamp: {type: Date, default: Date.now}
});

const Main = mongoose.model('Main', MainSchema);

module.exports = Main;