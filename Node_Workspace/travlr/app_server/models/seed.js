// Bring in the DB connection and the Trip schema
const mongoose = require('./db');
const Trip = require('./travlr');

// Read seed data from JSON file
var fs = require('fs');
var tripsData = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// Delete any existing records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    console.log('Existing trips deleted');
    
    await Trip.insertMany(tripsData);
    console.log('Seed data inserted');
};

// Close the MongoDB connection after seeding and exit
seedDB().then(async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
}).catch(err => {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
    process.exit(1);
});
