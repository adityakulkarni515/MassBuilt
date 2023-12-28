const mongoose = require('mongoose');

const memberStatusSchema= new mongoose.Schema({

    gymId:{
        type:String,
        required : true,
    }
    ,
    memberId:{
        type:String,
        required: false
    },

    statusCode:{
        type:String,
        required: false
    
    }
   

    })

 const MemberStatus= mongoose.model('memberStatus', memberStatusSchema)

 module.exports=MemberStatus