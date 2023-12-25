const Gym =require("../models/gym")
const Member=require("../models/members")


  

async function memberSubscription(req,res){

    let body=req.body

    console.log(body)

    if(!body ||!body.gymId||!body.name||!body.gymName||!body.contactNumber||!body.sex||!body.age||!body.service||!body.memberId||!body.userId)
      {
        return res.status(400).json({message: 'All the field are required'})
      }
    
    checkUserId= await Member.findOne({ userId:body.userId })
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
        userId:body.userId,
        service:body.service,
        memberId:body.memberId
        

      });
    
      console.log('result', addMemberDetails)
      return res.status(201).json({msg: 'you have suscribed to gym successfully'})
    }

    module.exports={memberSubscription}