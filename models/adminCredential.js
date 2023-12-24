const mongoose = require('mongoose');

const adminCredentialSchema= new mongoose.Schema({

    adminId:{
        type:String,
        required : true,
    }
    ,
    password:{
        type:Date,
        required: false
    },
   

    })

 const AdminCredential= mongoose.model('adminCredential', adminCredentialSchema)

 module.exports=AdminCredential