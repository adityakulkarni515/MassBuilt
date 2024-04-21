const PopularCities= require("../models/popularCities")

async function addPopularCities (req, res)  {
    try {
      const body=req.body;
  
      // Check if the city already exists as a popular city
      const existingCity = await PopularCities.findOne({ cityName });
      if (existingCity) {
        return res.status(400).json({ success: false, message: 'City already exists as a popular city.' });
      }
  
      // Create a new popular city
      newCity =  await PopularCities.create
      ({ cityName:body.cityName, 
         description:body.description });
      
  
      res.status(201).json({ success: true, message: 'Popular city added successfully.', data: newCity });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'An error occurred while adding the popular city.' });
    }
  };
  

  async function getAllCities (req, res)  {
    try {
      
  
      // Check if the city already exists as a popular city
      const allCities = await PopularCities.find({})
      if (!allCities) {
        return res.status(400).json({ success: false, message: 'no cities' });
      }
  
  
      res.status(200).json({ success: true, message: 'all the cities list', data: allCities });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'An error occurred while adding the popular city.' });
    }
  };
  module.exports = {addPopularCities,getAllCities}

