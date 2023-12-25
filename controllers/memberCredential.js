
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



    async function memberSignIn (req, res) {
      let body  = req.body;
  
      try {
          const existingUser= await MemberCredential.findOne({ userId:body.userId });
          if (!existingUser) {
              return res.status(404).json({ message: "User not found" });
          }
          const matchPassword= await bcrypt.compare(body.password, existingUser.password)
          if (!matchPassword) {
              return res.status(401).json({ message: "incorrect id or password" });

          }

          else{
              return res.status(200).json({message:"User logged in successfully"})
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