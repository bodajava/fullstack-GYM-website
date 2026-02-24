const Membership = require('../models/Membership');

// @desc    Get all memberships
// @route   GET /api/memberships
// @access  Public
const getMemberships = async (req, res) => {
    try {
        const memberships = await Membership.find({});
        res.json(memberships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a membership
// @route   POST /api/memberships
// @access  Private/Admin
const createMembership = async (req, res) => {
    try {
        const { title, price, duration, features } = req.body;
        const membership = new Membership({ title, price, duration, features });
        const createdMembership = await membership.save();
        res.status(201).json(createdMembership);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a membership
// @route   PUT /api/memberships/:id
// @access  Private/Admin
const updateMembership = async (req, res) => {
    try {
        const { title, price, duration, features } = req.body;
        const membership = await Membership.findById(req.params.id);

        if (membership) {
            membership.title = title || membership.title;
            membership.price = price !== undefined ? price : membership.price;
            membership.duration = duration || membership.duration;
            membership.features = features || membership.features;

            const updatedMembership = await membership.save();
            res.json(updatedMembership);
        } else {
            res.status(404).json({ message: 'Membership not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a membership
// @route   DELETE /api/memberships/:id
// @access  Private/Admin
const deleteMembership = async (req, res) => {
    try {
        const membership = await Membership.findById(req.params.id);
        if (membership) {
            await membership.deleteOne();
            res.json({ message: 'Membership removed' });
        } else {
            res.status(404).json({ message: 'Membership not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMemberships,
    createMembership,
    updateMembership,
    deleteMembership,
};
