const Member=require("../models/members")
const Transaction=require("../models/transactions")
const {unixToDateString} = require("../utils/unixUtils")

async function updatePendingSubscription(req,res){

  body=req.body

  const transactionDetails = await Transaction.findOne({transactionId: body.transactionId})

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


  const unix_timestamp = Date.now()
  const currentDate = await unixToDateString(unix_timestamp)
  const currentDateTime = currentDate + "T" + "23:59:59" + "Z"
  const startDateTime = transactionDetails.startDate

  console.log(currentDateTime, startDateTime)
  if( startDateTime != currentDateTime){
    return res.status(400).json({message:"Today is not the start date of subscription"})
  }

  const updateMemberDetails = await Member.findOneAndUpdate(
      { memberId: body.memberId },
      {
          $set: {
              transactionId:body.transactionId,
              status:"active",
              subscriptionDetails:body.subscriptionDetails,
              gymId:body.gymId
          },
      }
  )

    const updateTransactionDetails = await Transaction.findOneAndUpdate(
        {  transactionId: req.body.transactionId},
        {
            $set: {
                status:"resolved"
            },
        }
    )

    console.log('result',updateMemberDetails, updateTransactionDetails)
    return res.status(201).json({msg: 'You have suscribed to gym successfully'})
}

module.exports={updatePendingSubscription}
