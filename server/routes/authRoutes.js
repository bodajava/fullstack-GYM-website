const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { validate, signupSchema, loginSchema } = require('../middleware/validationMiddleware');

router.post('/register', validate(signupSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

module.exports = router;
