const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SportSchema = new Schema({
    name: String
});

const Sport = mongoose.model('Sport', SportSchema);

module.exports = Sport;