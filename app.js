const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json())
const userRouter=require("./routes/application")
const AdminRouter=require("./routes/admin")
const GymRouter=require("./routes/gym")
const MemberCredentialRouter=require("./routes/memberCredential")
const AdminCredentialRouter=require("./routes/adminCredential")
const GetGymListRouter=require("./routes/getGymList")
const GymSubscriptionRouter=require("./routes/memberSubscription")
const addMemberDetailsRouter=require("./routes/addMemberDetails")
const adminChangesRouter=require("./routes/adminChanges")
const updatePendingSubscriptionRoute= require('./routes/updatePendingSubscription');
const adminGymUpdate=require("./routes/pendingAdminGymUpdate")
const createCouponCode=require("./routes/createCouponCode")
const useCouponCode=require("./routes/useCouponCode")
const {connectToMongoDb}=require("./connections");

require('dotenv').config()

const PORT = process.env.PORT||4000


// password===V7kR3kWBAkbhmDsD
//password massbuilt===YcMPyR7DBtXiJKpA
// CURRENT MONGO DB PASSWORD = "QW5p2xL0EkOWWPc4"
// mongoDbCloudUrl="mongodb+srv://adityakulkarni515:QW5p2xL0EkOWWPc4@cluster0.zgh3orl.mongodb.net/"

console.log(process.env.DB_PASS)




// connectToMongoDb( mongoDbCloudUrl)


connectToMongoDb(process.env.DB_PASS)


app.use("/",userRouter)
app.use("/",AdminRouter)
app.use("/",GymRouter)
app.use("/",MemberCredentialRouter)
app.use("/",AdminCredentialRouter)
app.use("/",GetGymListRouter)
app.use("/",GymSubscriptionRouter)
app.use("/",addMemberDetailsRouter)
app.use("/",adminChangesRouter)
app.use("/",updatePendingSubscriptionRoute)
app.use("/",createCouponCode)
app.use("/",useCouponCode)
// app.use("/",adminChangesRouter)





// for local run

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// cloud hosting

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });