const express= require("express")

const{addPopularCities, getAllCities}=require("../controllers/addPopularCity")

const { searchCityByName } = require("../controllers/searchBarQuery")


const router=express.Router()

router.post('/addPopularCities', addPopularCities)

router.get('/getallcities',getAllCities)

router.get('/searchCitiesByName', searchCityByName)

module.exports=router