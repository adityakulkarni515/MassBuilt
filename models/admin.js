
const mongoose = require('mongoose');

const adminSchema= new mongoose.Schema({

    adminId:{
        type:Number,
        required : true,
    },
    name:{
        type:String,
        required : true,
    }
  
    ,
    emailId:{
        type:String,
        required : true,
    },
    gymName:{
        type:String,
        required : true,
    },
    contactNumber:{
        type:Number,
        required : true,
    }


    })

 const Admin= mongoose.model('admin', adminSchema)

 module.exports=Admin