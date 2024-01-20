
const mongoose = require('mongoose');

const couponSchema= new mongoose.Schema({

    couponCode:{
        type:String,
        required : true,
    },
    discountAmount:{
        type:Number,
        requried:true
    },
    gymId:{
        type:String,
        required : true,
    },
    subscriptionId:{
        type:String,
        required : true,
    }
    ,
    expiryDate:{
        type:String,
        required : true,
    }
    ,
    applicableMemberIds:{
        type:[String],
        required : true,
    }

    })

 const Coupon = mongoose.model('coupon', couponSchema)

 module.exports=Coupon