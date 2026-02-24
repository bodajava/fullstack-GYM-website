const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { errorHandler } = require('./middleware/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const programRoutes = require('./routes/programRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const contactRoutes = require('./routes/contactRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: true, // Allow all origins for easier debugging
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Database Connection Singleton for Serverless
let cachedDb = null;

const connectToDatabase = async () => {
    if (cachedDb && mongoose.connection.readyState === 1) {
        return cachedDb;
    }

    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
        console.error('MONGO_URI is missing in environment variables!');
        throw new Error('MONGO_URI is not defined');
    }

    try {
        console.log('Connecting to MongoDB...');
        // Close existing connection if it's broken
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        const db = await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        cachedDb = db;
        console.log('Connected to MongoDB');
        return db;
    } catch (err) {
        console.error('Database connection error:', err);
        throw err;
    }
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
    // Skip DB for basic root or health checks if needed, but here we want it for /status
    try {
        await connectToDatabase();
        next();
    } catch (err) {
        // If it's a critical route, fail
        if (req.path.startsWith('/api/')) {
            return res.status(500).json({
                message: 'Database connection failed',
                error: err.message,
                hint: 'Check if MONGO_URI is correct and IP whitelisting is enabled in MongoDB Atlas.'
            });
        }
        next();
    }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/bookings', bookingRoutes);

// Basic Route & Health Check
app.get('/', (req, res) => {
    res.json({ message: 'Gym Website API is running...' });
});

app.get('/api/status', (req, res) => {
    res.json({
        status: 'Operational',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        timestamp: new Date(),
        env: process.env.NODE_ENV
    });
});

// Error Middleware
app.use(errorHandler);

// Export for Vercel
module.exports = app;

// Only listen if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5050;
    app.listen(PORT, () => {
        console.log(`Server is running locally on port ${PORT}`);
    });
}

