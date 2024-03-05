const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: String
});

const VerifiedUser = mongoose.model('VerifiedUser', userSchema);

module.exports = VerifiedUser;
