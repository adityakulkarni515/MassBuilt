const Admin = require("../models/admin");
const AdminChanges = require("../models/adminChanges");
const Gym = require("../models/gym");
const Member=require("../models/members")
const Transaction=require("../models/transactions")

async function unixToDate(unix_timestamp){

  const date = new Date(unix_timestamp)
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const day = date.getDate();

  // Create a formatted date string
  const dateString = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

  return dateString
}

async function updatePendingUpdateSubscription(req,res){

  body=req.body

  const adminChangesDetails = await AdminChanges.findOne({adminId: body.adminId})

  console.log(adminChangesDetails)
  console.log("updatePending")
  console.log(adminChangesDetails.status )
  if(adminChangesDetails.status != 'Pending'){
    return res.status(400).json({message:"changes already processed"})
  }

  const gymDetails = await Gym.findOne({ gymId:adminChangesDetails.gymId })

  if(!gymDetails){
    return res.status(400).json({message:"This gym id does not exist"})
  }


  const unix_timestamp = Date.now()
  const currentDate = await unixToDate(unix_timestamp)
  const changeDate = await unixToDate((body.changeDate)*1000)

  console.log(currentDate, changeDate)
  if( changeDate != currentDate){
    return res.status(400).json({message:"Today is not the change date of subscription updation"})
  }

  

  const updateGymDetails = await Gym.findOneAndUpdate(
      { adminId: body.adminId },
      {
          $set: {
              changeRequestId:body.changeRequestId,
              subscriptionDetails:body.subscriptionDetails,
              gymId:body.gymId
          },
      }
  )

    const updateAdminChangesDetails = await AdminChanges.findOneAndUpdate(
        {  changeRequestId: req.body.changeRequestId},
        {
            $set: {
                status:"resolved"
            },
        }
    )

    console.log('result',updateGymDetails, updateAdminChangesDetails)
    return res.status(201).json({msg: 'You have suscribed to gym successfully'})
}

module.exports={updatePendingUpdateSubscription}
