const express= require("express")

const{addMemberDetails}=require("../controllers/addMemberDetails")

const router=express.Router()

const { generateGymId}=require("../middlewares/generateGymIdAdminId")

router.post('/addMemberDetails',addMemberDetails)

module.exports=router