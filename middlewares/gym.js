const Admin=require("../models/admin")



async function adminCheck(req, res, next) {
    try {

        console.log("hi middleware from adminid creation")


        checkAlreadyAdmin= await Admin.findOne({ gymId:req.body.gymId  })

      if(!checkAlreadyAdmin){
       return res.status(400).json({message: "gym host is not an Admin cannot host the gym"})
      }


    
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal error, something went wrong" });
    }
}

module.exports={adminCheck}