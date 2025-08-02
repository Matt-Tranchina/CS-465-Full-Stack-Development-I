const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// Define routes for trips
router.route('/trips')
    .get(tripsController.tripsList); // GET all trips


// GET method for a single trip by tripsFindByCode - requires parameter
router.route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode); // GET a single trip by code

// Export the router to be used in app.js
module.exports = router;