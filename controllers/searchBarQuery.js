
const PopularCities = require('../models/popularCities');

// Search route
 async function  searchCityByName(req, res) {
  const searchTerm = req.query.q; // Get search query from request query parameters

  try {
    // Perform case-insensitive partial search using regex
    const regex = new RegExp(searchTerm, 'i');
    const cities = await PopularCities.find({ cityName: regex }).exec();

    res.json({ success: true, data: cities });
  } catch (err) {
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
};

module.exports = {searchCityByName};
