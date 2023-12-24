
const mongoose = require('mongoose');

const applicantSchema= new mongoose.Schema({

    emailId:{
        type:String,
        required : true,
    },
    name:{
        type:String,
        required : true,
    },
    gymName:{
        type:String,
        required : true,
    }
    ,
    note:{
        type:String,
        required : true,
    }
    ,
    contactNumber:{
        type:Number,
        required : true,
    },
    address:{
        type:String,
        required : true,
    }

    })

 const Applicant= mongoose.model('applicant', applicantSchema)

 module.exports=Applicant