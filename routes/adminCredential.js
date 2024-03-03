const express= require("express")

const{adminSignUp,adminSignIn}=require("../controllers/adminCredential")
const { authJwtMiddlewareForAdmin } = require("../middlewares/authForAdmin")
const { normalizeEmail } = require("../middlewares/lowerCase")

const router=express.Router()

router.post('/adminSignUp',normalizeEmail, adminSignUp)

router.post('/adminSignIn' , normalizeEmail, adminSignIn)

module.exports=router