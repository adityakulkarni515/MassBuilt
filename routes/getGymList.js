const express= require("express")

const{getGymList,getMemberList}=require("../controllers/getGymList")

const{daysToExpire}=require("../controllers/daysToExpire")

const{getMembersWithExpiryLessThan15Days}=require("../controllers/listOfMembersExp")

const { authJwtMiddleware } = require("../middlewares/auth")
const { authJwtMiddlewareForAdmin } = require("../middlewares/authForAdmin")
const { getGymIdAdminId } = require("../controllers/gymIdAdminId")
const { noOfGymMembers } = require("../controllers/noOfGymMembers")
const { getAdminDetails } = require("../controllers/admin")


const router=express.Router()



router.post('/getGymList', getGymList)

router.get("/checkgym",getMemberList)

router.post('/expiredays',authJwtMiddlewareForAdmin, daysToExpire)

router.post('/expiremembers',authJwtMiddlewareForAdmin,getMembersWithExpiryLessThan15Days )

router.post('/getGymAdminId', getGymIdAdminId)

router.post('/noOfActiveMembers',noOfGymMembers)

router.post('/getAdminDetails',getAdminDetails)





module.exports=router