const express= require("express")

const{adminSignUp,adminSignIn}=require("../controllers/adminCredential")
const { authJwtMiddlewareForAdmin } = require("../middlewares/authForAdmin")
const { normalizeEmail } = require("../middlewares/lowerCase")
const { verifyEmailIdOfUser, verifyEmail } = require("../controllers/verifyEmailSignupUser")

const router=express.Router()

router.post('/verifyEmail',normalizeEmail,verifyEmailIdOfUser)


router.get('/verifyEmailOnClick/:token',normalizeEmail,verifyEmail)

router.post('/adminSignUp',normalizeEmail, adminSignUp)

router.post('/adminSignIn' , normalizeEmail, adminSignIn)

module.exports=router