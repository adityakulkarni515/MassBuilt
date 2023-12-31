
const mongoose = require('mongoose');

const gymSchema= new mongoose.Schema({

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
        type:Number,
        required:true
    }
    ,
    areaCode:{
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
    }
    ,
    gymMedia:{
        
        data: Buffer,
        contentType:String,
        
    },
    subscriptionDetails: [
        {
          type: Map,
          of: Map,
        },
      ],

    })

 const Gym= mongoose.model('gym', gymSchema)

 module.exports=Gym