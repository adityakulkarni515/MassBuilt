const express= require("express")

const{addPopularCities}=require("../controllers/addPopularCity")

const { searchCityByName } = require("../controllers/searchBarQuery")


const router=express.Router()

router.post('/addPopularCities', addPopularCities)

router.get('/searchCitiesByName', searchCityByName)

module.exports=router