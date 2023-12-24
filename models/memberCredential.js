const mongoose = require('mongoose');

const memberCredentialSchema= new mongoose.Schema({

    userId:{
        type:String,
        required : true,
    }
    ,
    password:{
        type:Date,
        required: false
    },
   

    })

 const MemberCredential= mongoose.model('memberCredential', memberCredentialSchema)

 module.exports=MemberCredential