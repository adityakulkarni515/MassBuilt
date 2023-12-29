const Transaction=require("../models/transactions")
const Member=require("../models/members")
const {updateMemberSubscription} =require("../controllers/updateMemberSubscription")

  
async function calculateFutureDate(numberOfMonths) {
  const currentDate = new Date();

  // Calculate the future date
  const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + numberOfMonths, currentDate.getDate());

  // Format the result as a string (you can customize the format as needed)
  const formattedFutureDate = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1).toString().padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;

  return formattedFutureDate;
}

async function memberSubscription(req,res){

    
  checkUserId= await Member.findOne({ emailId:body.emailId })

  if(checkUserId){
    return res.status(400).json({message:"you have already subscribed to this gym "})
  }

  checkMemberId = await Member.findOne({ memberId:body.memberId })
  //to check if there is any other gym already with this gym id 
  if(checkMemberId){
    return res.status(400).json({message:"This member Id is already existing  "})
  }

  if(transactionDetails.startDate - Date() <= 15){
    return res.status(400).js
  }
  
  const futureDate = await calculateFutureDate(body.duration);
  console.log(`Future Date (${body.duration} months later): ${futureDate}`);
  
  const addTransactionDetails = await Transaction.create({
    gymId : body.gymId,
    service:body.service,
    memberId:body.memberId,
    transactionId: transactionId,
    startDate: body.startDate,
    duration:body.duration,
    endDate:futureDate,
    status: "Pending"
  })

  updateMemberSubscription(transactionId)

  console.log('result',addMemberDetails, addTransactionDetails,addMemberStatus)
  return res.status(201).json({msg: 'You have suscribed to gym successfully'})
}

module.exports={memberSubscription}