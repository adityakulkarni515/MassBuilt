
const mongoose = require('mongoose');

const gymSchema= new mongoose.Schema({

    gymId:{
        type:String,
        required : true,
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
    ,
    contactDetails:{
        type:String,
        required:true
    }
    ,
    areaCode:{
        type:String,
        required:true
    },
    timing:{
        type:Object,
        required:true
    }
    ,
    services:{
        type:Object,
        required:true
    }
    ,
    facilities:{
        type:Object,
        required:true
    }
    ,
    gymMedia:{
        
        data: Buffer,
        contentType:String,
        required:false
    }
    ,subscriptions:
    {   
        type:Object,
        required:true
    }

    })

 const Gym= mongoose.model('gym', gymSchema)

 module.exports=Gym