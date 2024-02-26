const express= require("express")

const{adminSubscriptionChanges}=require("../controllers/adminGymUpdate")

const { generatechangeRequestId } = require("../middlewares/changeRequestId")

const { updatePendingAdminUpdateSubscription } = require("../controllers/updatePendingAdminChanges")

const router=express.Router()

router.post('/adminGymUpdate',generatechangeRequestId, adminSubscriptionChanges,updatePendingAdminUpdateSubscription)

module.exports=router