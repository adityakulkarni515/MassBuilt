const Transaction=require("../models/transactions")
const Member=require("../models/members")
const Gym=require("../models/gym")
const {calculateFutureDate, unixToDateString, ONE_DAY} =require("../utils/unixUtils")
const moment = require('moment');   


async function daysToExpire(req,res){
    
  body = req.body

if(!(body.memberId)){
    return res.status(400).json({message:"Request Payload not correct"})  
}

{
    try {
      // Query MongoDB to find the expiry date from the admin collection
      const member = await Member.findOne({memberId:body.memberId}); // Assuming there's only one document in the admin collection
      if (!member) {
        return res.status(404).json({ message: 'Member data not found' });
      }

    const expirydateformtrans=await Transaction.findOne({transactionId:member.transactionId})

      // Calculate days until expiry
      const now = moment(); // Current date
      const expiry = moment(expirydateformtrans.endDate); // Expiry date from the database
      const daysUntilExpiry = expiry.diff(now, 'days');
  
      res.status(200).json({ message:daysUntilExpiry });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
module.exports={daysToExpire}