const express= require("express")

const{updatePendingSubscription}=require("../controllers/updatePendingSubscription")

const router=express.Router()

router.post('/updatePendingSubscription', updatePendingSubscription)

module.exports=router