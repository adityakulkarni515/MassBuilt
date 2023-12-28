const Transaction=require("../models/transactions")
const Member=require("../models/members")
const MemberStatus=require("../models/memberStatus")

  

async function memberSubscription(req,res){

    let body=req.body

    console.log(body)

    if(!body ||!body.gymId||!body.name||!body.gymName||!body.contactNumber||!body.sex||!body.age||!body.service||!body.memberId||!body.emailId||!body.duration)
      {
        return res.status(400).json({message: 'All the field are required'})
      }
    
    checkUserId= await Member.findOne({ emailId:body.emailId })
    if(checkUserId)
{
    return res.status(400).json({message:"you have already subscribed to this gym "})
}

      checkMemberId = await Member.findOne({ memberId:body.memberId })
    //to check if there is any other gym already with this gym id 
      if(checkMemberId)
      {
      return res.status(400).json({message:"This member Id is already existing  "})
      }
      
    
      const addMemberDetails = await Member.create({
    
        gymId : body.gymId,
        name :body.name,
        gymName:body.gymName,
        contactNumber:body.contactNumber,
        age:body.age,
        sex:body.sex,
        emailId:body.emailId,
        service:body.service,
        memberId:body.memberId
    
        

      });

      


      async function calculateFutureDate(numberOfMonths) {
        const currentDate = new Date();
      
        // Calculate the future date
        const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + numberOfMonths, currentDate.getDate());
      
        // Format the result as a string (you can customize the format as needed)
        const formattedFutureDate = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1).toString().padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;
      
        return formattedFutureDate;
      }
      
      // Example usage:
      
      const futureDate = await calculateFutureDate(body.duration);
      console.log(`Future Date (${body.duration} months later): ${futureDate}`);
    

     
        const addTransactionDetails = await Transaction.create({
    
          gymId : body.gymId,
          // age:body.age,
          // sex:body.sex,
          // emailId:body.emailId,
          service:body.service,
          memberId:body.memberId,
          transactionId:body.transactionId,
          startDate:Date(),
          duration:body.duration,
          endDate:futureDate
      })


      const addMemberStatus= await MemberStatus.create({

        gymId:body.gymId,
        memberId:body.memberId,
        statusCode:"active"
      })


      


    
      console.log('result',addMemberDetails, addTransactionDetails,addMemberStatus)
      return res.status(201).json({msg: 'you have suscribed to gym successfully'})
    }

    module.exports={memberSubscription}