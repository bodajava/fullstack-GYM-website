const express = require('express');
const router = express.Router();
const {
    getPrograms,
    getProgramById,
    createProgram,
    updateProgram,
    deleteProgram,
} = require('../controllers/programController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getPrograms).post(protect, admin, createProgram);
router
    .route('/:id')
    .get(getProgramById)
    .put(protect, admin, updateProgram)
    .delete(protect, admin, deleteProgram);

module.exports = router;
