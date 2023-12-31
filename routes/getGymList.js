const express= require("express")

const{getGymList}=require("../controllers/getGymList")


const router=express.Router()

router.post('/getGymList', getGymList)

module.exports=router