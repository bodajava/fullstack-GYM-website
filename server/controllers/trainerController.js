const Trainer = require('../models/Trainer');

// @desc    Get all trainers
// @route   GET /api/trainers
// @access  Public
const getTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find({});
        res.json(trainers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single trainer
// @route   GET /api/trainers/:id
// @access  Public
const getTrainerById = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id);
        if (trainer) {
            res.json(trainer);
        } else {
            res.status(404).json({ message: 'Trainer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a trainer
// @route   POST /api/trainers
// @access  Private/Admin
const createTrainer = async (req, res) => {
    try {
        const { name, specialty, image, bio } = req.body;
        const trainer = new Trainer({ name, specialty, image, bio });
        const createdTrainer = await trainer.save();
        res.status(201).json(createdTrainer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a trainer
// @route   PUT /api/trainers/:id
// @access  Private/Admin
const updateTrainer = async (req, res) => {
    try {
        const { name, specialty, image, bio } = req.body;
        const trainer = await Trainer.findById(req.params.id);

        if (trainer) {
            trainer.name = name || trainer.name;
            trainer.specialty = specialty || trainer.specialty;
            trainer.image = image || trainer.image;
            trainer.bio = bio || trainer.bio;

            const updatedTrainer = await trainer.save();
            res.json(updatedTrainer);
        } else {
            res.status(404).json({ message: 'Trainer not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a trainer
// @route   DELETE /api/trainers/:id
// @access  Private/Admin
const deleteTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id);
        if (trainer) {
            await trainer.deleteOne();
            res.json({ message: 'Trainer removed' });
        } else {
            res.status(404).json({ message: 'Trainer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTrainers,
    getTrainerById,
    createTrainer,
    updateTrainer,
    deleteTrainer,
};
