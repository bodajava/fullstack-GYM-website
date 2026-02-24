const express = require('express');
const router = express.Router();
const {
    getTrainers,
    getTrainerById,
    createTrainer,
    updateTrainer,
    deleteTrainer,
} = require('../controllers/trainerController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getTrainers).post(protect, admin, createTrainer);
router
    .route('/:id')
    .get(getTrainerById)
    .put(protect, admin, updateTrainer)
    .delete(protect, admin, deleteTrainer);

module.exports = router;
