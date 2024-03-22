const mongoose = require('mongoose');

const popularCitiesSchema= new mongoose.Schema({

    cityName:{
        type:String,
        required : true,
    }
    ,
    description:{
        type:String,
        required: false
    },
  
   

    })

 const PopularCities= mongoose.model('popularcitie', popularCitiesSchema)

 module.exports=PopularCities