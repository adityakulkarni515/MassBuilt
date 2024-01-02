const Transaction=require("../models/transactions")
const Member=require("../models/members")
const Gym=require("../models/gym")
const {calculateFutureDate, unixToDateString, ONE_DAY} =require("../utils/unixUtils")



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
  console.log((body.startDate)*1000 - Date.now())
  console.log(15 * ONE_DAY)

  const startDateNightString = String(body.startDate) + " " + "23:59:59"
  const startDateNightTimestamp = new Date(startDateNightString).getTime()
  const nowTimestamp = Date.now()
  const todayDateString = await unixToDateString(nowTimestamp)
  const tonightDateString = todayDateString + " " + "23:59:59"
  const tonightDateTimestamp = new Date(tonightDateString).getTime()
  const fifteenDaysDate = await Date(nowTimestamp)
  const endDateString = await calculateFutureDate(body.duration * 30, startDateNightTimestamp)

  console.log(`15 days future date ${fifteenDaysDate}`)
  console.log(`Future Date (${body.duration} months later): ${endDateString}`);

  console.log(startDateNightTimestamp-tonightDateTimestamp)

  if(!(startDateNightTimestamp - tonightDateTimestamp <= 15 * ONE_DAY && startDateNightTimestamp - nowTimestamp >= 0)){
    return res.status(400).json({message:"Date is more than 15 days"})
  }
  
  const addTransactionDetails = await Transaction.create({
    gymId : body.gymId,
    service:body.service,
    subscriptionDetails:body.subscriptionDetails,
    memberId:body.memberId,
    transactionId: body.transactionId,
    startDate: body.startDate,
    duration:body.duration,
    endDate:endDateString,
    status: "Pending"
  })

  console.log(Date.now())

  if(body.startDate == todayDateString){
    next()
  }
  else{
    return res.status(201).json({message:"Your subscription will be added on chosen date"}) 
  }

}

module.exports={memberSubscription}