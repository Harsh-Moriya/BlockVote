const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    collegeID: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    metamaskAcc: {
        type: String,
        required: true,
    },
    
});

const User = mongoose.model('user', UserSchema);

module.exports = User