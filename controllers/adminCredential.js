
const AdminCredential=require("../models/adminCredential")
const Admin=require("../models/admin")
const bcrypt=require("bcrypt")


  

async function adminSignUp(req,res){

    let body=req.body

    if(!body ||!body.adminId||!body.password)
      {
        return res.status(400).json({message: 'All the field are required'})
      }

      checkAdmin=await Admin.findOne({adminId:body.adminId})

      if(!checkAdmin){
           return res.status(400).json({message:"you are not the admin"})
      }
    
      check = await AdminCredential.findOne({ adminId:body.adminId})
    //to check if there is any other gym already with this gym id 
      if(check)
      {
      return res.status(400).json({message:"This email is already registered"})
      }
      const hashPassword = await bcrypt.hash(body.password, 10);

      // Save user data (in a real app, use a database)
     
      

    
    
      const  addAdminCredential = await AdminCredential.create({
    
        adminId: body.adminId,
        password:hashPassword

      });
    
      console.log('result', addAdminCredential)
      return res.status(201).json({msg: 'You have been registered successfully'})
    }


    async function adminSignIn (req, res) {
        let body  = req.body;
    
        try {
            const existingAdmin= await AdminCredential.findOne({ adminId:body.adminId });
            if (!existingAdmin) {
                return res.status(404).json({ message: "Admin not found" });
            }
            const matchPassword= await bcrypt.compare(body.password, existingAdmin.password)
            if (!matchPassword) {
                return res.status(401).json({ message: "incorrect id or password" });

            }

            else{
                return res.status(200).json({message:"admin logged in successfully"})
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
    

    module.exports={adminSignUp,adminSignIn}