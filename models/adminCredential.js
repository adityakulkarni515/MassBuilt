const mongoose = require('mongoose');

const adminCredentialSchema= new mongoose.Schema({

    adminId:{
        type:String,
        required : true,
    }
    ,
    password:{
        type:String,
        required: false
    },
   

    })

 const AdminCredential= mongoose.model('adminCredential', adminCredentialSchema)

 module.exports=AdminCredential