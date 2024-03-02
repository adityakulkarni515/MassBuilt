const Admin=require("../models/admin")
const Applicant=require("../models/applicant")


async function approvedToAddInAdmin(req,res){

    let body=req.body

    console.log(body)

    if(!body ||!body.emailId||!body.gymName||!body.name||!body.contactNumber||!body.adminId)
      {
        return res.status(400).json({message: 'All the field are required'})
      }
    
      checkIfAdminIdGenerated= await Applicant.findOne({ emailId:body.emailId  })


       if(!checkIfAdminIdGenerated)
      {
      return res.status(400).json({message:"Applicant does not exist"})
      }
      
    
    
      const addUserAsApplicatnt = await Admin.create({
    
        emailId : body.emailId,
        name :body.name,
        gymName:body.gymName,
        contactNumber:body.contactNumber,
        adminId:body.adminId,
        
    
      });
    
      console.log('result', addUserAsApplicatnt)
      return res.status(201).json({msg: 'success'})
    }


    

    async function getAdminDetails(req,res){

      let body=req.body
  
      console.log(body)
  
      if(!body ||!body.adminId)

        {
          return res.status(400).json({message: 'All the field are required'})
        }
      
        checkIfAdmin= await Admin.findOne({ adminId:body.adminId  })


        console.log(checkIfAdmin)
  
  
         if(!checkIfAdmin)
        {
        return res.status(400).json({message:"Admin Dont exeist"})
        }
        
      
        console.log('result', checkIfAdmin)
        return res.status(201).json({msg: 'success',"Admin Details":checkIfAdmin})
      }
  


    module.exports={approvedToAddInAdmin, getAdminDetails}