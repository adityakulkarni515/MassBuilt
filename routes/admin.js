const express= require("express")

const { approvedToAddInAdmin } = require("../controllers/admin")

const { generateAdminId}=require("../middlewares/generateGymIdAdminId")

const router=express.Router()

router.post('/approve',  generateAdminId,approvedToAddInAdmin)

module.exports=router