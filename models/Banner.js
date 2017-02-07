const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
    bid: String,
    image: String,
});

const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;