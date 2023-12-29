const express= require("express")

const{memberSubscription}=require("../controllers/memberSubscription")
const{updatePendingSubscription}=require("../controllers/updatePendingSubscription")


const { generateTransactionId } = require("../middlewares/transactionsId")

const router=express.Router()

router.post('/subscription',generateTransactionId, memberSubscription, updatePendingSubscription)


module.exports=router