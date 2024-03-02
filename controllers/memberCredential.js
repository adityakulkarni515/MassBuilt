
const MemberCredential=require("../models/memberCredential")
const jwt = require('jsonwebtoken');
const Member=require("../models/members")
const bcrypt=require("bcrypt")

const jwtKey="KEY"
  

async function memberSignUp(req,res){

    let body=req.body

    if(!body ||!body.emailId||!body.password)
      {
        return res.status(400).json({message: 'All the field are required'})
      }
    
      check = await MemberCredential.findOne({ emailId:body.emailId})
    //to check if there is any other gym already with this gym id 
      if(check)
      {
      return res.status(400).json({message:"This email is already registered"})
      }
      const hashPassword = await bcrypt.hash(body.password, 10);

      // Save user data (in a real app, use a database)
     
      // Sign a JWT token with the user ID
   

    
    
      const addMemberCredential = await MemberCredential.create({
    
        emailId: body.emailId,
        password:hashPassword,
        memberId:body.memberId

      });

      const addMemebrIdToMember=await Member.create({
        memberId:body.memberId,
        emailId:body.emailId,
        status:"guest"
      })


      const token = await jwt.sign({ emailId: body.emailId }, jwtKey, { expiresIn: '1h' });
    
      console.log('result', addMemberCredential,addMemebrIdToMember,token)
      return res.status(201).json({msg: 'You have been registered successfully',tokenId:token})
    }



    async function memberSignIn (req, res) {
      let body  = req.body;
  
      try {
          const existingUser= await MemberCredential.findOne({ emailId:body.emailId });
          if (!existingUser) {
              return res.status(404).json({ message: "User not found" });
          }
          const matchPassword= await bcrypt.compare(body.password, existingUser.password)
          if (!matchPassword) {
              return res.status(401).json({ message: "incorrect id or password" });

        

          }

          else{
            const token = await jwt.sign({ emailId: existingUser.emailId }, jwtKey, { expiresIn: '1h' });
            console.log("your logged in successfully")
              return res.status(200).json({message:"User logged in successfully",tokenId:token})
          }
          // } else {
  
          //     const token =jwt.sign({User_ID:existingUser.User_ID,     id:existingUser._id},   KEY)
          //     return res.status(200).json({ message: "user logged in " ,token : token});
          // }
  
          
  
      } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Something went wrong" });
      }
  };
  

    module.exports={memberSignUp,memberSignIn}