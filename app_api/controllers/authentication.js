
const mongoose = require('mongoose');
const User = require('../models/users');
const passport = require('passport');

// Controller for user registration
// This function handles user registration by creating a new user record
const registerUser = async (req, res) => {
    const { email, name, password } = req.body;

    // Validate input
    if (!email || !name || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const user = new User({ 
            name,
            email
        });
        user.setPassword(password);
        await user.save();

        const token = user.generateJwt(); // Use correct method name
        return res.status(201).json({ token });
    } catch (err) {
        return res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Delegate authentication to passport module
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                // Error in Authentication Process
                return res.status(404).json(err);   
            }
            if (user) {
                // Auth succeeded - generate JWT and return to caller
                const token = user.generateJwt();
                res.status(200).json({ token });
            } else {
                // Auth failed return error
                res.status(401).json(info);
            }
        })(req, res);
    } catch (err) {
        return res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};

// Controller to delete a user by email
const deleteUserByEmail = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.validatePassword(password)) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        await User.deleteOne({ email });
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
};
module.exports = {
    registerUser,
    loginUser,
    deleteUserByEmail
};