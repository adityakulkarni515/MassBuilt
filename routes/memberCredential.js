const express= require("express")

const{memberSignUp,memberSignIn}=require("../controllers/memberCredential")

const router=express.Router()

router.post('/signup', memberSignUp)
router.post('/signin', memberSignIn)

module.exports=router