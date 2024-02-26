const express= require("express")

const { updatePendingAdminUpdateSubscription } = require("../controllers/updatePendingAdminChanges")

const router=express.Router()

router.post('/pendingadminGymUpdate',updatePendingAdminUpdateSubscription)

module.exports=router