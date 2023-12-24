const express= require("express")

const{hostGymOnApp}=require("../controllers/gym")

const router=express.Router()

router.post('/gymhosting', hostGymOnApp)

module.exports=router