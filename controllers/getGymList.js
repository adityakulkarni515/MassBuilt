const Gym =require("../models/gym")
const Admin=require("../models/admin")


  

async function getGymList(req,res){

    let body=req.body

    if(!body||!body.areaCode)
      {
        return res.status(400).json({message: 'All the field are required'})
      }
    
      checkIsGym = await Gym.find({areaCode:body.areaCode})
      
      console.log(checkIsGym)
    //to check if there is any other gym already with this gym id 
      if(!checkIsGym)
      {
      return res.status(400).json({message:"currently no gym in this Area, Sorry for inconvinence"})
      }

     
    
      return res.status(200).json({msg: 'This are the currently avaliable gyms in this area',checkIsGym})
    }

    module.exports={getGymList}