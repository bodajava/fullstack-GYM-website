const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    const { trainer, program, bookingDate, notes } = req.body;

    if (!bookingDate) {
        return res.status(400).json({ message: 'Please provide a booking date' });
    }

    const booking = await Booking.create({
        user: req.user._id,
        trainer,
        program,
        bookingDate,
        notes,
    });

    if (booking) {
        res.status(201).json(booking);
    } else {
        res.status(400).json({ message: 'Invalid booking data' });
    }
};

// @desc    Get all bookings (Admin or Personal)
// @route   GET /api/bookings
// @access  Private
const getBookings = async (req, res) => {
    let bookings;
    if (req.user.role === 'admin') {
        bookings = await Booking.find({}).populate('user', 'name email').populate('trainer', 'name').populate('program', 'name');
    } else {
        bookings = await Booking.find({ user: req.user._id }).populate('trainer', 'name').populate('program', 'name');
    }
    res.json(bookings);
};

module.exports = {
    createBooking,
    getBookings,
};
