const express= require("express")

const{applicationRequest}=require("../controllers/applicant")

const router=express.Router()

router.post('/applicant', applicationRequest)

module.exports=router