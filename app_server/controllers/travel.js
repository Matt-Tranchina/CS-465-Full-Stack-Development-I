const tripsEndpoint = 'http://localhost:3000/api/trips'; // Example API endpoint for trips
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
};

// var fs = require('fs');
// var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const travel = async (req, res, next) => {
  console.log('Travel controller called');
  
  await fetch(tripsEndpoint, options)
    .then((data) => data.json())
    .then((json) => {

      let message = null;

      if (!(json instanceof Array)) {
        message = 'API lookup error';
        json = [];
      } else if (!json.length) {
        message = 'No trips exist in the database';
      }

      res.render('travel', {
        title: 'Travlr Getaways',
        trips: json,
        message,
        selected: { travel: true},
      }); // Pass the trips data to the view
    })
    .catch((err) => res.status(500).send(err.message));
};


module.exports = {
    travel // Export the travel function
};