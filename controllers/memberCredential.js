
const MemberCredential=require("../models/memberCredential")
const bcrypt=require("bcrypt")


  

async function memberSignUp(req,res){

    let body=req.body

    if(!body ||!body.userId||!body.password)
      {
        return res.status(400).json({message: 'All the field are required'})
      }
    
      check = await MemberCredential.findOne({ userId:body.userId})
    //to check if there is any other gym already with this gym id 
      if(check)
      {
      return res.status(400).json({message:"This email is already registered"})
      }
      const hashPassword = await bcrypt.hash(body.password, 10);

      // Save user data (in a real app, use a database)
     
      

    
    
      const addMemberCredential = await MemberCredential.create({
    
        userId: body.userId,
        password:hashPassword

      });
    
      console.log('result', addMemberCredential)
      return res.status(201).json({msg: 'You have been registered successfully'})
    }

    module.exports={memberSignUp}