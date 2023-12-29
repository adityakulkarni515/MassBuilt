const Member=require("../models/members")
const Transaction=require("../models/transactions")


async function updateMemberSubscription(req,res){

  const transactionDetails = await Transaction.findOne({transactionID: req.body.transactionId})

  if(transactionDetails.status != "Pending"){
    return res.status(400).json({message:"Transaction is not in pending"})
  }

  const memberDetails = await Member.findOne({ memberId:transactionDetails.memberId })

  if(!memberDetails){
    return res.status(400).json({message:"This member id does not exist"})
  }

  if(transactionDetails.startDate != Date()){
    return res.status(400).json({message:"Today is not the start date of subscription"})
  }

  if(memberDetails.subscriptionDetails){
    return res.status(400).json({message:"Member is already subscribed to another subscription"})
  }

    const updateMemberDetails = await Member.findOneAndUpdate(
        { memberId: body.memberId },
        {
            $set: {
                transactionID: req.body.transactionId,
                status:"active"
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

module.exports={updateMemberSubscription}
