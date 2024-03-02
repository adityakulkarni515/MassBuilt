const AdminCredential = require("../models/adminCredential")
const Gym = require("../models/gym")

async function getGymIdAdminId(req,res){

    let body=req.body

    console.log(body)

    if(!body ||!body.emailId){
        return res.status(400).json({message: 'All the field are required'})
    }
     checkIsMember=await AdminCredential.findOne({emailId:body.emailId}) 
     if(!checkIsMember){
      return res.status(400).json({message:"members id not in his admin credentials"})
     }

    gymIdFetch=await Gym.findOne({adminId:checkIsMember.adminId})
     
    if(!(gymIdFetch)){

        return res.status(400).json({message:"admin did not host gym yet"})

    }
     gymIdAdmiId={gymId:gymIdFetch.gymId,adminId:checkIsMember.adminId}


   

        console.log('result',gymIdAdmiId)
        return res.status(200).json({ gymIdAdmiId})

}

module.exports={getGymIdAdminId
    
}