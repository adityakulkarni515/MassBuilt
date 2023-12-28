const express= require("express")

const{memberSubscription}=require("../controllers/memberSubscription")

const{generateMemberId}=require("../middlewares/generateMemberId")
const { generateTransactionId } = require("../middlewares/transactionsId")

const router=express.Router()

router.post('/subscription',generateMemberId,generateTransactionId, memberSubscription)


module.exports=router