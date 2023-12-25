const express= require("express")

const{memberSubscription}=require("../controllers/memberSubscription")

const{generateMemberId}=require("../middlewares/generateMemberId")

const router=express.Router()

router.post('/subscription',generateMemberId, memberSubscription)


module.exports=router