const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// Validation middleware for user creation
const validatorUser = [
    check('email').isEmail(),
    check('name').isLength({ min: 5 }),
    check('password', 'Password should be at least 5 characters').isLength({ min: 5 }),
];

// Validation middleware for login
const validatorLogin = [
    check('email').isEmail(),
    check('password', 'Password should be at least 5 characters').isLength({ min: 5 }),
];

// POST endpoint for creating a user
router.post('/creatuser', validatorUser, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructure user input
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        // Generate salt and hash password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user instance with hashed password
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword, // Store hashed password in database
        });

        // Save user to database
        await newUser.save();

        console.log('User created:', newUser); // Optional: log the created user

        //Generate JWT token
        const payload = {
            user: {
                id: newUser.id,
            },
        };

        jwt.sign(payload, secret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ message: 'User created successfully', token });
        });
    } catch (err) {
        // Log error to console
        console.error('Error creating user:', err);

        // Send error response
        res.status(500).json({ message: 'Failed to create user' });
    }
});

// POST endpoint for user login
router.post('/login', validatorLogin, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructure user input
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, secret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Failed to login' });
    }
});

module.exports = router;
