const mongoose = require('mongoose');

const adminCredentialSchema= new mongoose.Schema({

    emailId:{
        type:String,
        required : true,
    }
    ,
    adminId:{
        type:String,
        required: true
    },
   
    password:{
        type:String,
        required: true
    },
   

    })

 const AdminCredential= mongoose.model('adminCredential', adminCredentialSchema)

 module.exports=AdminCredential