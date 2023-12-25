const Gym =require("../models/gym")
const Member=require("../models/members")


  

async function memberSubscription(req,res){

    let body=req.body

    if(!body ||!body.gymId||!body.name||!body.gymName||!body.contactDetails||!body.sex||!body.subscriptions||!body.facilities||!body.services||!body.timing||!body.areaCode)
      {
        return res.status(400).json({message: 'All the field are required'})
      }
    
      check = await Gym.findOne({ gymId:body.gymId })
    //to check if there is any other gym already with this gym id 
      if(check)
      {
      return res.status(400).json({message:"This Gym ID is already been hosted by other please enter your Gym ID "})
      }
      //to check he is admin or not
      checkAlreadyAdmin= await Admin.findOne({ gymId:req.body.gymId  })

      if(!checkAlreadyAdmin){
       return res.status(400).json({message: "gym host is not an Admin cannot host the gym"})
      }

    
    
      const addGymDetails = await Gym.create({
    
        gymId : body.gymId,
        name :body.name,
        gymName:body.gymName,
        contactDetails:body.contactDetails,
        address:body.address,
        subscriptions:body.subscriptions,
        facilities:body.facilities,
        timing:body.timing,
        areaCode:body.areaCode,
        services:body.services,
        gymMedia:body.gymMedia

      });
    
      console.log('result', addGymDetails)
      return res.status(201).json({msg: 'Your gym has been hosted successfully'})
    }

    module.exports={hostGymOnApp}