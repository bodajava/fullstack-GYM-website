const Program = require('../models/Program');

// @desc    Get all programs
// @route   GET /api/programs
// @access  Public
const getPrograms = async (req, res) => {
    try {
        const programs = await Program.find({});
        res.json(programs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single program
// @route   GET /api/programs/:id
// @access  Public
const getProgramById = async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);
        if (program) {
            res.json(program);
        } else {
            res.status(404).json({ message: 'Program not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a program
// @route   POST /api/programs
// @access  Private/Admin
const createProgram = async (req, res) => {
    try {
        const { name, description, image, difficulty } = req.body;
        const program = new Program({ name, description, image, difficulty });
        const createdProgram = await program.save();
        res.status(201).json(createdProgram);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a program
// @route   PUT /api/programs/:id
// @access  Private/Admin
const updateProgram = async (req, res) => {
    try {
        const { name, description, image, difficulty } = req.body;
        const program = await Program.findById(req.params.id);

        if (program) {
            program.name = name || program.name;
            program.description = description || program.description;
            program.image = image || program.image;
            program.difficulty = difficulty || program.difficulty;

            const updatedProgram = await program.save();
            res.json(updatedProgram);
        } else {
            res.status(404).json({ message: 'Program not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a program
// @route   DELETE /api/programs/:id
// @access  Private/Admin
const deleteProgram = async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);
        if (program) {
            await program.deleteOne();
            res.json({ message: 'Program removed' });
        } else {
            res.status(404).json({ message: 'Program not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPrograms,
    getProgramById,
    createProgram,
    updateProgram,
    deleteProgram,
};
