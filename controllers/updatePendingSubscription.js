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
  const currentDate = await unixToDate(unix_timestamp)
  const startDate = await unixToDate((body.startDate)*1000)

  console.log(currentDate, startDate)
  if( startDate != currentDate){
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
