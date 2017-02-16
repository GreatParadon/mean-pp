import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EstimoteSchema = new Schema({
    uuid: String,
    text: String,
    color: String
});

const Estimote = mongoose.model('Estimote', EstimoteSchema);

module.exports = Estimote;