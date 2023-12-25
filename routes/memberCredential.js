const express= require("express")

const{memberSignUp}=require("../controllers/memberCredential")

const router=express.Router()

router.post('/signup', memberSignUp)

module.exports=router