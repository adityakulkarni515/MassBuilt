const Transaction=require("../models/transactions")
const Member=require("../models/members")
const {updatePendingSubscription} =require("./updatePendingSubscription")
const AdminChanges = require("../models/adminChanges")
const Admin = require("../models/admin")
const Gym = require("../models/gym")

// const ONE_MONTH = 2592000
// const ONE_DAY = 86400
  
// async function calculateFutureDate(numberOfMonths) {
//   const currentDate = Date.now();

//   const date = new Date(currentDate + numberOfMonths * ONE_MONTH * 1000)
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1; // Months are zero-based, so add 1
//   const day = date.getDate();

// // Create a formatted date string
//   const futureDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

//   console.log(futureDate)
//   return futureDate;
// }

async function adminSubscriptionChanges(req,res){

    
  body = req.body
//   currentDate = Date.now()
//   console.log(currentDate)
  if(!(body.gymId && body.adminId &&body.subscriptionDetails )){
    return res.status(400).json({message:"Request Payload not correct"})
  }

  checkAdminId = await Admin.findOne({ adminId:body.adminId })
  //to check if there is any other gym already with this gym id 
  if(!checkAdminId){
    return res.status(400).json({message:"This admin Id is does not exist"})
  }


//   if(body.startDate - Date.now() <= 15 * ONE_DAY && body.startDate - Date() >= 0){
//     return res.status(400).json({message:"Date is more than 15 days"})
//   }
  
//   const futureDate = await calculateFutureDate(body.duration);
 
//   console.log(`Future Date (${body.duration} months later): ${futureDate}`);
  
  const addChangesInGym= await Gym.findOneAndUpdate(

  { adminId: body.adminId },
  {
      $set: {
          subscriptionDetails:body.subscriptionDetails,
      },
  }
  )
  const addChanges = await AdminChanges.create(

        {
     
            subscriptionDetails:body.subscriptionDetails,
            status:"pending",
            adminId:body.adminId,
            gymId:body.gymId
        },
    
    )
//   console.log(Date.now())

//   if(body.startDate - Date.now() <= 1 * ONE_DAY){
//     next()
//   }
//   else{
console.log(addChanges,addChangesInGym)
    return res.status(400).json({message:"Your subscription will be added on chosen date"}) 
  }



module.exports={adminSubscriptionChanges}