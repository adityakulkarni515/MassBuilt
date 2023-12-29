const Transaction=require("../models/transactions")
const Member=require("../models/members")
const {updatePendingSubscription} =require("./updatePendingSubscription")

const ONE_MONTH = 2592000
const ONE_DAY = 86400
  
async function calculateFutureDate(numberOfMonths) {
  const currentDate = Date.now();

  const date = new Date(currentDate + numberOfMonths * ONE_MONTH * 1000)
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const day = date.getDate();

// Create a formatted date string
  const futureDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

  console.log(futureDate)
  return futureDate;
}

async function memberSubscription(req,res,next){

    
  body = req.body
  currentDate = Date.now()
  console.log(currentDate)
  if(!(body.gymId && body.service && body.memberId && body.transactionId && body.startDate && body.duration)){
    return res.status(400).json({message:"Request Payload not correct"})
  }

  checkMemberId = await Member.findOne({ memberId:body.memberId })
  //to check if there is any other gym already with this gym id 
  if(!checkMemberId){
    return res.status(400).json({message:"This member Id is does not exist"})
  }


  if(body.startDate - Date.now() <= 15 * ONE_DAY && body.startDate - Date() >= 0){
    return res.status(400).json({message:"Date is more than 15 days"})
  }
  
  const futureDate = await calculateFutureDate(body.duration);
 
  console.log(`Future Date (${body.duration} months later): ${futureDate}`);
  
  const addTransactionDetails = await Transaction.create({
    gymId : body.gymId,
    service:body.service,
    memberId:body.memberId,
    transactionId: body.transactionId,
    startDate: body.startDate,
    duration:body.duration,
    endDate:futureDate,
    status: "Pending"
  })

  console.log(Date.now())

  if(body.startDate - Date.now() <= 1 * ONE_DAY){
    next()
  }
  else{
    return res.status(400).json({message:"Your subscription will be added on chosen date"}) 
  }

}

module.exports={memberSubscription}