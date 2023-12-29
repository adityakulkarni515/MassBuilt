const express= require("express")

const{memberSignUp,memberSignIn}=require("../controllers/memberCredential")

const{generateMemberId}=require("../middlewares/generateMemberId")
const router=express.Router()

router.post('/signup',generateMemberId, memberSignUp)
router.post('/signin', memberSignIn)

module.exports=router