
const mongoose = require('mongoose');

const transactionSchema= new mongoose.Schema({

    transactionId:{
        type:String,
        required : true,
    },
    memberId:{
        type:String,
        required : true,
    }
    ,
    gymId:{
        type:String,
        required : false,
    }
    ,
    startDate:{
        type:Date,
        required: false
    },
    endDate:{
        type:Date,
        required: false
    },
    duration:
    {   
        type:Number,
        required: false
    }
    ,
    status:
    {   
        type:String,
        required: false
    }
    

    })

 const Transaction= mongoose.model('transaction', transactionSchema)

 module.exports=Transaction