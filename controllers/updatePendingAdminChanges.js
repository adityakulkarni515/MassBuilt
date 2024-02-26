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

async function updatePendingAdminUpdateSubscription(req,res){

  body=req.body

  if(!(body.adminId||body.gymId||body.changeRequestId||body.changeDate)){

    return res.status(400).json({message:"incorrect payload"})

  }

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

// Get the current date
const todaysDate = new Date();

// Extract year, month, and day components
const year = todaysDate.getUTCFullYear();
const month = String(todaysDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(todaysDate.getUTCDate()).padStart(2, '0');

// Construct the date string
const currentDate= `${year}-${month}-${day}T00:00:00.000+00:00`;

console.log(currentDate); // Output: "2024-02-25T00:00:00.000+00:00"

 

  console.log(currentDate)
  if( body.changeDate != currentDate){
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

module.exports={updatePendingAdminUpdateSubscription}
