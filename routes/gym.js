const express= require("express")

const{hostGymOnApp}=require("../controllers/gym")

const router=express.Router()

const { generateGymId}=require("../middlewares/generateGymIdAdminId")

const { addGymSubscription } = require("../controllers/addGymSubscription")

router.post('/gymhosting', generateGymId,hostGymOnApp)

router.post('/addGymSubscription', addGymSubscription)

module.exports=router