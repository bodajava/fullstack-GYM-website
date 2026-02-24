const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer',
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending',
    },
    notes: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
