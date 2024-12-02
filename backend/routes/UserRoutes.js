const express = require('express');
const { signup, login } = require('../controllers/UserController'); // Adjust the path if needed
const router = express.Router();

// Register routes without repeating the `/users` prefix (it's already handled in the main app file)
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
