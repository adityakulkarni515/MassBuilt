const express= require("express")

const{hostGymOnApp}=require("../controllers/gym")

const router=express.Router()

const { generateGymId}=require("../middlewares/generateGymIdAdminId")

router.post('/gymhosting', generateGymId,hostGymOnApp)

module.exports=router