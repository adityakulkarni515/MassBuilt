const mongoose = require('mongoose');

const memberCredentialSchema= new mongoose.Schema({

    userId:{
        type:String,
        required : true,
    }
    ,
    password:{
        type:String,
        required: false
    },
   

    })

 const MemberCredential= mongoose.model('memberCredential', memberCredentialSchema)

 module.exports=MemberCredential