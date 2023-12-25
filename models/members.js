
const mongoose = require('mongoose');

const memberSchema= new mongoose.Schema({

    memberId:{
        type:Number,
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
    userId:{
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
    },
    gymName:{
        type:String,
        required:true
    }
    ,
    gymId:{
        type:String,
        required:true
    },
    service:{
        type:String,
        required:true
    }
    })

 const Member= mongoose.model('member', memberSchema)

 module.exports=Member