var fs = require('fs');
var rooms_data = JSON.parse(fs.readFileSync('./data/rooms_data.json', 'utf8'));

/* GET rooms view */
const rooms = (req, res) => {
  res.render('rooms', { title: 'Travlr Getaways', rooms_data});
};

module.exports = {
    rooms // Export the rooms function
};