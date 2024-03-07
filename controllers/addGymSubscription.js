const Admin=require("../models/admin")
const Gym=require("../models/gym")
const SubscriptionDeatails = require("../models/subscriptionDetails")


async function addGymSubscription(req,res){

    let body=req.body

    console.log(body)

    if(!body ||!body.gymId||!body.subscriptionId||!body.planName||!body.durationInDays||!body.price)
      {
        return res.status(400).json({message: 'All the field are required'})
      }
    
      checkIfGymThere= await Gym.findOne({ gymId:body.gymId  })


       if(!checkIfGymThere)
      {
      return res.status(400).json({message:"gym does not exist"})
      }
      
    
    
      const addGymSubscriptionDetails = await SubscriptionDeatails.create({
    
        gymId : body.gymId,
        price:body.price,
        subscriptionId:body.subscriptionId,
        planName:body.planName,
        durationInDays:body.durationInDays
        
        
    
      });
    
      console.log('result', addGymSubscriptionDetails)
      return res.status(201).json({msg: 'subscription added successfully'})
    }



 module.exports={addGymSubscription}