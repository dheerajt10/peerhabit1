const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    naam: {
        type: String,
        required: true
    },
    frequency: {
        type: [String]
    },
    people: {
        type: [String]
    }
});  

module.exports = mongoose.model('Groups', groupSchema);
