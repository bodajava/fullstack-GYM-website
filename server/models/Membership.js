const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: String, // e.g., '1 Month', '1 Year'
        required: true,
    },
    features: [{
        type: String,
    }],
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema);
