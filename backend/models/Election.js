const mongoose = require('mongoose');
const { Schema } = mongoose;

const ElectionSchema = new Schema({
    electionID: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    candidates: {
        type: Array,
        required: true
    },
    voters: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('election', ElectionSchema);