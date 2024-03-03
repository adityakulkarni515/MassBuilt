const express= require("express")

const{memberSignUp,memberSignIn}=require("../controllers/memberCredential")

const{generateMemberId}=require("../middlewares/generateMemberId")
const { normalizeEmail } = require("../middlewares/lowerCase")
const router=express.Router()

router.post('/signup',normalizeEmail, generateMemberId, memberSignUp)

router.post('/signin',normalizeEmail, memberSignIn)

module.exports=router