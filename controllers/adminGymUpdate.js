const Transaction=require("../models/transactions")
const Member=require("../models/members")
const {updatePendingSubscription} =require("./updatePendingSubscription")
const AdminChanges = require("../models/adminChanges")
const Admin = require("../models/admin")
const Gym = require("../models/gym")


const ONE_DAY = 86400000
async function adminSubscriptionChanges(req,res,next){

    
  body = req.body

  if(!(body.gymId && body.adminId &&body.subscriptionDetails &&body.changeDate&&body.changeRequestId)){
    return res.status(400).json({message:"Request Payload not correct"})
  }

  checkAdminId = await Admin.findOne({ adminId:body.adminId })
  //to check if there is any other gym already with this gym id 
  if(!checkAdminId){
    return res.status(400).json({message:"This admin Id is does not exist"})
  }
  checkGymId = await Gym.findOne({ gymId:body.gymId })
  //to check if there is any other gym already with this gym id 
  if(!checkGymId){
    return res.status(400).json({message:"This gym Id is does not exist"})
  }


  if(!((body.changeDate)*1000 - Date.now() >= 0)){

    res.status(400).json({message:"invalid change date entered"})

  }




  const addChangesInPending = await AdminChanges.create(

        {
            changeRequestId:body.changeRequestId,
            subscriptionDetails:body.subscriptionDetails,
            status:"Pending",
            adminId:body.adminId,
            gymId:body.gymId,
            changeDate:(body.changeDate)*1000
        },
    
    )


    if(body.changeDate - Date.now() <= 1 * ONE_DAY){
      next()
    }

    else{
console.log(addChangesInPending)
    return res.status(400).json({message:"Your subscription will be updated on chosen date"}) 
  }
}

module.exports={adminSubscriptionChanges}