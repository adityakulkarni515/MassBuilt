const express= require("express")

const{adminSignUp,adminSignIn}=require("../controllers/adminCredential")
const { authJwtMiddlewareForAdmin } = require("../middlewares/authForAdmin")

const router=express.Router()

router.post('/adminSignUp',adminSignUp)

router.post('/adminSignIn' ,adminSignIn)

module.exports=router