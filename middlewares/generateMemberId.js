


const Admin=require("../models/admin");
const MemberCredential = require("../models/memberCredential");
const Member=require("../models/members")




async function generateMemberId(req, res, next) {
    try {

        console.log("hi middleware from memberid creation")

    
        // Generate a random number between 10000000 and 99999999
       
        let memberId = Math.floor(Math.random()* (99999999 - 10000000 + 1) + 10000000);


        console.log(memberId)

        
        
        // Attach the generated gymId to the request object
        req.body.memberId = memberId;
       
        

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