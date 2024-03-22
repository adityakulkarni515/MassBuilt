
const mongoose = require('mongoose');


const gymSchema= new mongoose.Schema({

    changeRequestId:{
        type:Number,
        required : false,
    },


    adminId:{
        type:Number,
        required : true,
    },

    gymId:{
        type:Number,
        required : true,
    },
    gymName:{
        type:String,
        required : true,
    },
   
    address:{
        type:String,
        required:true
    }
    ,
    mobileNumber:{
        type:Number,
        required:true
    }
    ,
    pinCode:{
        type:Number,
        required:true
    },
    timing:{
        type:Object,
        required:true
    }
    ,
    services:{
        type:Array,
        required:true
    }
    ,
    facilities:{
        type:Array,
        required:true
    },
    stateName:{
        type:String,
        required:true
    },
    cityName:{
        type:String,
        required:true
    },
    
   
    })

 

const Gym= mongoose.model('gym', gymSchema)

 module.exports=Gym