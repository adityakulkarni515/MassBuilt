
const mongoose = require('mongoose');

const memberSchema= new mongoose.Schema({

    memberId:{
        type:Number,
        required : true,
    },
    gymId:{
        type:Number,
        required : true,
    },
    name:{
        type:String,
        required:false
    }
    ,
    contactNumber:{
        type:Number,
        required:false
    },
    emailId:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:false
    },
    sex:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:false
    },
    transactionId:{
        type: Number,
        required:false
    },
    subscriptionDetails: 
        {
          type: Map,
          of: Map,
        },
      
    })

 const Member= mongoose.model('member', memberSchema)

 module.exports=Member