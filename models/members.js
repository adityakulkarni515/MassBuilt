
const mongoose = require('mongoose');

const memberSchema= new mongoose.Schema({

    memberId:{
        type:String,
        required : true,
    },
    name:{
        type:String,
        required:true
    }
    ,
    contactNumber:{
        type:Number,
        required:true
    },
    emailId:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    sex:{
        type:String,
        required:true
    }
    })

 const Member= mongoose.model('member', memberSchema)

 module.exports=Member