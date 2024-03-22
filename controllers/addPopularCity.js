const PopularCities= require("../models/popularCities")

async function addPopularCities (req, res)  {
    try {
      const { cityName, description } = req.body;
  
      // Check if the city already exists as a popular city
      const existingCity = await PopularCities.findOne({ cityName });
      if (existingCity) {
        return res.status(400).json({ success: false, message: 'City already exists as a popular city.' });
      }
  
      // Create a new popular city
      const newCity = new PopularCities({ cityName, description });
      await newCity.save();
  
      res.status(201).json({ success: true, message: 'Popular city added successfully.', data: newCity });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'An error occurred while adding the popular city.' });
    }
  };
  
  module.exports = {addPopularCities}