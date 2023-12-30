const express= require("express")

const{adminSubscriptionChanges}=require("../controllers/adminGymUpdate")

const router=express.Router()

router.post('/updateGym', adminSubscriptionChanges)

module.exports=router