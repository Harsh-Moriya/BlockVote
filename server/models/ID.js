const mongoose = require('mongoose');
const { Schema } = mongoose;

const IDSchema = new Schema({
    collegeID: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

const ID = mongoose.model('ID', IDSchema);

module.exports = ID