const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    email: {
        type: String,
        required: true
    },
    naam: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    habits: {
        type: [Schema.Types.ObjectId],
        ref: 'groups'
    }
});

module.exports = mongoose.model('Users', userSchema);
