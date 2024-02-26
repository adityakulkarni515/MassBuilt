const Gym =require("../models/gym")
const Admin=require("../models/admin")
const Member = require("../models/members")


  

async function getGymList(req,res){

    let body=req.body

    if(!body||!body.areaCode)
      {
        return res.status(400).json({message: 'All the field are required'})
      }
    
      checkIsGym = await Gym.find({areaCode:body.areaCode})
      
      console.log(checkIsGym)
    //to check if there is any other gym already with this gym id 
      if(checkIsGym.length===0)
      {
      return res.status(400).json({message:"currently no gym in this Area, Sorry for inconvinence"})
      }

     
    
      return res.status(200).json({msg: 'This are the currently avaliable gyms in this area',checkIsGym})
    }


    async function getMemberList(req,res){

      let body=req.body
     {
        try {
          // Query MongoDB to find documents where the key 'key1' exists
          const result = await Member.find({ applicableCouponCodes: { $exists: true } });
          res.json(result);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }}
      
    module.exports={getGymList, getMemberList}