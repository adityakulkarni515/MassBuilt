const Transaction=require("../models/transactions")
const Member=require("../models/members")
const   MemberCredential=require("../models/memberCredential")
  

async function addMemberDetails(req,res){

    let body=req.body

    console.log(body)

    if(!body ||!body.name|| !body.contactNumber||!body.sex||!body.age || !body.memberId ){
        return res.status(400).json({message: 'All the field are required'})
    }
     checkIsMember=await MemberCredential.findOne({memberId:body.memberId}) 
     if(!checkIsMember){
      return res.status(400).json({message:"members id not in his members credentials"})
     }


    const updateMemberDetails=await Member.findOneAndUpdate(
        { memberId: body.memberId },
        {
          $set: {
            name: body.name, // Add the remaining fields and their values here
            contactNumber:body.contactNumber,
            age: body.age,
            sex: body.sex,
            status:"prospect"
           
          },
        }
        )

        console.log('result',updateMemberDetails)
        return res.status(201).json({msg: 'your details are added successfully'})

}

module.exports={addMemberDetails
    
}