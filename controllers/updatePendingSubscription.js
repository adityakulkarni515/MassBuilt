const Member=require("../models/members")
const Transaction=require("../models/transactions")
const {unixToDateString} = require("../utils/unixUtils")

async function updatePendingSubscription(req,res){

  body=req.body

  const transactionDetails = await Transaction.findOne({transactionId: body.transactionId})
  if(!(transactionDetails)){
    return res.status(400).json({message:"Transaction id not found"})
  }

  console.log(transactionDetails)
  console.log("updatePending")
  console.log(transactionDetails.status )
  if(transactionDetails.status != 'Pending'){
    return res.status(400).json({message:"Transaction is not in pending"})
  }

  const memberDetails = await Member.findOne({ memberId:transactionDetails.memberId })

  if(!memberDetails){
    return res.status(400).json({message:"This member id does not exist"})
  }

  if(memberDetails.status == "active"){
    return res.status(400).json({message:"Member is already subscribed to another subscription"})
  }

   // Get the current date in IST
   const currentDateIST = new Date();
   currentDateIST.setHours(currentDateIST.getHours() + 5); // Adding 5 hours for IST
   currentDateIST.setMinutes(currentDateIST.getMinutes() + 30); // Adding 30 minutes for IST

   // Extract year, month, and day components
   const year = currentDateIST.getUTCFullYear();
   const month = String(currentDateIST.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
   const day = String(currentDateIST.getUTCDate()).padStart(2, '0');

   // Construct the date string
   const currentDateForm = new Date(`${year}-${month}-${day}T00:00:00.000+00:00`);


  // const unix_timestamp = Date.now()
  // const currentDate = await unixToDateString(unix_timestamp)
  // const currentDateTimeString = currentDate + "T" + "00:00:00.000" + "Z"  
  // const currentDateTime = new Date(currentDateTimeString)
  // const startDateTime = transactionDetails.startDate

  console.log(transactionDetails.startDate, currentDateForm,transactionDetails)



  if( transactionDetails.startDate.getTime() === currentDateForm.getTime()){
    
  

  const updateMemberDetails = await Member.findOneAndUpdate(
      { memberId: transactionDetails.memberId },
      {
          $set: {
              transactionId:transactionDetails.transactionId,
              status:"active",
              subscriptionDetails:transactionDetails.subscriptionDetails,
              gymId:transactionDetails.gymId
          },
      }
  )

    const updateTransactionDetails = await Transaction.findOneAndUpdate(
        {  transactionId: transactionDetails.transactionId},
        {
            $set: {
                status:"resolved"
            },
        }
    )
   
    console.log('result',updateMemberDetails, updateTransactionDetails)
    return res.status(201).json({msg: 'You have suscribed to gym successfully'})
 }
    return res.status(400).json({message:"Today is not the start date of subscription"})
}

module.exports={updatePendingSubscription}
