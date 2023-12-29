const express= require("express")

const{memberSubscription}=require("../controllers/memberSubscription")


const { generateTransactionId } = require("../middlewares/transactionsId")

const router=express.Router()

router.post('/subscription',generateTransactionId, memberSubscription)


module.exports=router