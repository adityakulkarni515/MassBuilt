const express= require("express")

const{useCouponCode}=require("../controllers/useCouponCode")

const router=express.Router()

router.post('/useCouponCode', useCouponCode)

module.exports=router