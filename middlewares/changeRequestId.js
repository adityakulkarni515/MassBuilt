


const Admin=require("../models/admin");
const Transaction= require("../models/transactions");
const Member=require("../models/members");
const AdminChanges = require("../models/adminChanges");




async function generatechangeRequestId(req, res, next) {
    try {

        console.log("hi middleware from change request id creation")


        checkAlreadyUser= await AdminChanges.findOne({ changeRequestId:req.body.changeRequestId})

        console.log(checkAlreadyUser)

      if(checkAlreadyUser){
       return res.status(400).json({message: "sorry for inconvinence please retry"})
      }

    
        // Generate a random number between 10000000 and 99999999
       
        let changeRequestId = Math.floor(Math.random()* (99999999 - 10000000 + 1) + 10000000);

        console.log(changeRequestId)

        
        
        // Attach the generated gymId to the request object
        req.body.changeRequestId = changeRequestId;
       
        

        // Call next() to pass control to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal error, something went wrong" });
    }
}






module.exports={
    generatechangeRequestId
    
}