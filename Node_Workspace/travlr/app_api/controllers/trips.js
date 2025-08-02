const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register the Trip model
const Model = mongoose.model('trips');

// GET: /trips - list all the trips
// Reguardless of outcome, response must include HTML status code 
// and JSON message to the requesting client.
const tripsList = async (req, res) => {
    const q = await Model 
        .find({}) // No filter, return all records
        .exec();

        console.log(q);

    if (!q) {
        // If no trips found, return 404 status code with message
        return res.status(404).json({ message: 'No trips found' });
    } else {
        // If trips found, return 200 status code with the list of trips
        return res.status(200).json(q);
    }
};

// GET: /trips/:tripCode - lists a single trip
// Reguardless of outcome, response must include HTML status code
// and JSON message to the requesting client.
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({'code': req.params.tripCode }) // Filter by tripCode
        .exec();

        console.log(q);

    if(!q) {
        // If no trip found, return 404 status code with message
        return res.status(404).json({ message: 'Trip not found' });
    } else {
        // If trip found, return 200 status code with the trip details
        return res.status(200).json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};