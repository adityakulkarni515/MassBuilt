const express= require("express")

const{getGymList,getMemberList}=require("../controllers/getGymList")


const router=express.Router()

router.post('/getGymList', getGymList)

router.get("/checkgym",getMemberList)

module.exports=router