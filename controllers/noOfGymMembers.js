const AdminCredential = require("../models/adminCredential")
const Gym = require("../models/gym")
const Member = require("../models/members")

async function noOfGymMembers(req,res){

    let body=req.body

    console.log(body)

    if(!body ||!body.gymId){
        return res.status(400).json({message: 'All the field are required'})
    }
     checkIsMember=await Gym.findOne({gymId:body.gymId}) 
     if(!checkIsMember){
      return res.status(400).json({message:"gym id not in his gym list"})
     }

     const activeMembersCount = await Member.countDocuments({ gymId: body.gymId, status: 'active' });

   

        console.log('result',activeMembersCount)
        return res.status(200).json({ "No of active memebrs" :activeMembersCount})

}

module.exports={noOfGymMembers}