const express= require("express")

const { approvedToAddInAdmin } = require("../controllers/admin")

const { generateAdminId,generategymId}=require("../middlewares/generateGymIdAdminId")

const router=express.Router()

router.post('/approve',  generateAdminId,generategymId,approvedToAddInAdmin)

module.exports=router