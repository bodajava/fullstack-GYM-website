const express = require('express');
const router = express.Router();
const {
    getMemberships,
    createMembership,
    updateMembership,
    deleteMembership,
} = require('../controllers/membershipController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getMemberships).post(protect, admin, createMembership);
router
    .route('/:id')
    .put(protect, admin, updateMembership)
    .delete(protect, admin, deleteMembership);

module.exports = router;
