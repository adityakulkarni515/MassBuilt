


const Admin=require("../models/admin");
const Transaction= require("../models/transactions");
const Member=require("../models/members")




async function generateTransactionId(req, res, next) {
    try {

        console.log("hi middleware from transactionid id creation")


        checkAlreadyUser= await Transaction.findOne({ transactionId:req.body.transactionId})

      if(checkAlreadyUser){
       return res.status(400).json({message: "sorry for inconvinence please retry"})
      }

    
        // Generate a random number between 10000000 and 99999999
       
        let transactionId = Math.floor(Math.random()* (99999999 - 10000000 + 1) + 10000000);

        console.log(transactionId)

        
        
        // Attach the generated gymId to the request object
        req.body.transactionId = transactionId;
       
        

        // Call next() to pass control to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal error, something went wrong" });
    }
}






module.exports={
    generateTransactionId
    
}