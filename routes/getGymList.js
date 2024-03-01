const express= require("express")

const{getGymList,getMemberList}=require("../controllers/getGymList")

const{daysToExpire}=require("../controllers/daysToExpire")

const{getMembersWithExpiryLessThan15Days}=require("../controllers/listOfMembersExp")

const { authJwtMiddleware } = require("../middlewares/auth")

const router=express.Router()



router.post('/getGymList', getGymList)

router.get("/checkgym",getMemberList)

router.post('/expiredays',authJwtMiddleware, daysToExpire)

router.post('/expiremembers',getMembersWithExpiryLessThan15Days )

module.exports=router