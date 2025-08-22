const express = require('express');
const router = express.Router();  
const {expressjwt: jwt} = require('express-jwt');
const tripsController = require('../controllers/trips');
const authenticationController = require('../controllers/authentication');
//const jwt = require('jsonwebtoken'); // enable JWT token handling

// Middleware to authenticate JWT tokens
function authenticateJWT(req, res, next) {
    // Expect header: Authorization: Bearer <token>
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] })(req, res, next);
}
// Middleware to handle errors from JWT authentication
function jwtErrorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid token' });
    }
    next(err); // Pass other errors to the next middleware
};


// Define routes for user authentication
router.route('/register')
    .post(authenticationController.registerUser);        // POST for user registration
router.route('/login')
    .post(authenticationController.loginUser);           // POST for user login
router.route('/deleteUser')
    .delete(authenticationController.deleteUserByEmail); // DELETE for user deletion

// Public routes for getting trips
router.route('/trips')
    .get(tripsController.tripsList); // GET all trips

router.route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode); // GET a single trip by code


// Protect routes below this line with JWT authentication
router.use(authenticateJWT);
router.use(jwtErrorHandler);

// Protected routes for adding/updating trips
router.route('/trips')
    .post(tripsController.tripsAddTrip); // POST adds a new trip

router.route('/trips/:tripCode')
    .put(tripsController.tripsUpdateTrip);      // PUT to update a trip by code

// Export the router to be used in app.js
module.exports = router;