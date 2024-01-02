const Transaction=require("../models/transactions")
const Member=require("../models/members")
const Gym=require("../models/gym")
const {calculateFutureDate, unixToDateString} =require("../utils/unixUtils")



async function memberSubscription(req,res,next){
    
  body = req.body
  
  if(!(body.gymId && body.service && body.memberId && body.transactionId && body.startDate && body.duration)){
    return res.status(400).json({message:"Request Payload not correct"})
  }

  checkMemberId = await Member.findOne({ memberId:body.memberId })
  //to check if there is any other gym already with this gym id 
  if(!checkMemberId){
    return res.status(400).json({message:"This member Id is does not exist"})
  }
  checkGymId = await Gym.findOne({ gymId:body.gymId })
  //to check if there is any other gym already with this gym id 
  if(!checkGymId){
    return res.status(400).json({message:"This gym Id is does not exist"})
  }

  if(checkMemberId.status == "active"){
    return res.status(400).json({message:"Member is already subscribed to another subscription"})
  }

  if(!((body.startDate)*1000 - Date.now() <= 15 * ONE_DAY && (body.startDate)*1000 - Date.now() >= 0)){
    return res.status(400).json({message:"Date is more than 15 days"})
  }

  const todayDateString = await unixToDateString(Date.now())
  const startDateString = await unixToDateString((body.startDate)*1000)
  const endDateString = await calculateFutureDate(body.duration,(body.startDate)*1000);
  console.log(`Future Date (${body.duration} months later): ${futureDate}`);
  
  const addTransactionDetails = await Transaction.create({
    gymId : body.gymId,
    service:body.service,
    subscriptionDetails:body.subscriptionDetails,
    memberId:body.memberId,
    transactionId: body.transactionId,
    startDate: startDateString,
    duration:body.duration,
    endDate:endDateString,
    status: "Pending"
  })

  console.log(Date.now())

  if(startDateString == todayDateString){
    next()
  }
  else{
    return res.status(400).json({message:"Your subscription will be added on chosen date"}) 
  }

}

module.exports={memberSubscription}