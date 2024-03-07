const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    gymId: {
        type: Number,
        required: true
    },
    planName: {
        type: String,
        required: true
    },
    durationInDays: {
        type: Number,
        required: true
    },
    subscriptionId: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const SubscriptionDeatails = mongoose.model('Subscription', subscriptionSchema);

module.exports = SubscriptionDeatails;
