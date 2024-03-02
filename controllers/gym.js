const Gym =require("../models/gym")
const Admin=require("../models/admin")
const AdminCredential = require("../models/adminCredential")


  

async function hostGymOnApp(req,res){

    let body=req.body

    if(!body ||!body.adminId||!body.gymId||!body.name||!body.gymName||!body.contactDetails||!body.address||!body.subscriptionDetails||!body.facilities||!body.services||!body.timing||!body.areaCode)
      {
        return res.status(400).json({message: 'All the field are required'})
      }
    checkAdminCredential=await AdminCredential.findOne({adminId:body.adminId})

    if(!checkAdminCredential){
      return res.status(400).json({message: "gym host is not an Admin or has not siggned up yet so cannot host the gym"})
     }


    checkAdminInGym=await Gym.findOne({adminId:body.adminId})

    if(checkAdminInGym)
    {
      return res.status(400).json({message:"Sorry! gym has been hosted by the Admin already "})
    }

    
   

      check = await Gym.findOne({ gymId:body.gymId })
    //to check if there is any other gym already with this gym id 
      if(check)
      {
      return res.status(400).json({message:"This Gym ID is already been hosted by other please enter your Gym ID "})
      }
      //to check he is admin or not
      


    
    
      const addGymDetails = await Gym.create({
    
        gymId : body.gymId,
        adminId:body.adminId,
        name :body.name,
        gymName:body.gymName,
        contactDetails:body.contactDetails,
        address:body.address,
        subscriptionDetails:body.subscriptionDetails,
        facilities:body.facilities,
        timing:body.timing,
        areaCode:body.areaCode,
        services:body.services,
        gymMedia:body.gymMedia
        

      });
      const updateAdminStatus=await Admin.findOneAndUpdate({adminId:body.adminId},
        
    {
      $set: {
          
          status:"active",
        
      }
    }
        )
    
      console.log('result', addGymDetails)
      return res.status(201).json({msg: 'Your gym has been hosted successfully'})
    }

    module.exports={hostGymOnApp}