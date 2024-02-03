const express= require("express")

const{createCouponCode}=require("../controllers/createCouponCode")

const router=express.Router()

router.post('/createCouponCode', createCouponCode)

module.exports=router