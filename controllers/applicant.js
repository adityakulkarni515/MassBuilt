const Applicant =require("../models/applicant")


  

async function applicationRequest(req,res){

    let body=req.body

    if(!body ||!body.emailId||!body.name||!body.gymName||!body.contactNumber||!body.note||!body.address)
      {
        return res.status(400).json({message: 'All the field are required'})
      }
    
      check = await Applicant.findOne({ emailId:body.emailId  })
    
      if(check)
      {
      return res.status(400).json({message:"user already exist"})
      }
    
    
      const addUserAsApplicant = await Applicant.create({
    
        emailId : body.emailId,
        name :body.name,
        gymName:body.gymName,
        contactNumber:body.contactNumber,
        note:body.note,
        address:body.address
      });
    
      console.log('result', addUserAsApplicant)
      return res.status(201).json({msg: 'success'})
    }

    module.exports={applicationRequest}