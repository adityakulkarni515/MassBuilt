const express= require("express")

const{getGymList}=require("../controllers/getGymList")
const { get } = require("mongoose")

const router=express.Router()

router.post('/getGymList', getGymList)

module.exports=router