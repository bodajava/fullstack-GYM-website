const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    difficulty: {
        type: String, // e.g., 'Beginner', 'Intermediate', 'Advanced'
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner',
    },
}, { timestamps: true });

module.exports = mongoose.model('Program', programSchema);
