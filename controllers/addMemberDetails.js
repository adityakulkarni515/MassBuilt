const Transaction=require("../models/transactions")
const Member=require("../models/members")
  

async function addMemberDetails(req,res){

    let body=req.body

    console.log(body)

    if(!body ||!body.name|| !body.contactNumber||!body.sex||!body.age || !body.memberId ){
        return res.status(400).json({message: 'All the field are required'})
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

}