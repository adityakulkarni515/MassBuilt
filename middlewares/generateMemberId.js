


const Admin=require("../models/admin");
const MemberCredential = require("../models/memberCredential");
const Member=require("../models/members")




async function generateMemberId(req, res, next) {
    try {


        body=req.body

        check = await MemberCredential.findOne({ emailId:body.emailId})

        if(check)
      {
      return res.status(400).json({message:"This email is already registered"})
      }


        
        console.log("hi middleware from memberid creation")

    
        // Generate a random number between 10000000 and 99999999
       
        let memberId = Math.floor(Math.random()* (99999999 - 10000000 + 1) + 10000000);


        console.log(memberId)

        
        
        // Attach the generated gymId to the request object
        body.memberId = memberId;
       
        

        // Call next() to pass control to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal error, something went wrong" });
    }
}






module.exports={
    generateMemberId
    
}