const express = require('express')
const app = express()
const port = 4000
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
const {connectToMongoDb}=require("./connections");

// password===V7kR3kWBAkbhmDsD
//password massbuilt===YcMPyR7DBtXiJKpA
mongoDbCloudUrl="mongodb+srv://adityakulkarni515:QW5p2xL0EkOWWPc4@cluster0.zgh3orl.mongodb.net/"




connectToMongoDb(mongoDbCloudUrl)


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
// app.use("/",adminChangesRouter)







app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});