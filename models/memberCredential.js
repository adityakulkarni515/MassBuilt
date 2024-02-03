const mongoose = require('mongoose');

const memberCredentialSchema= new mongoose.Schema({

    // googleEmailId:{
    //     type:String,
    //     required : true,          for oauth user 
    // },
    emailId:{
        type:String,
        required : true,
    }
    ,
    password:{
        type:String,
        required: false
    },
    memberId:{
        type:Number,
        required: true
    },
   

    })

 const MemberCredential= mongoose.model('memberCredential', memberCredentialSchema)

 module.exports=MemberCredential