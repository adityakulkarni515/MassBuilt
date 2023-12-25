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
const {connectToMongoDb}=require("./connections")


connectToMongoDb('mongodb://127.0.0.1:27017/mymongo')


app.use("/",userRouter)
app.use("/",AdminRouter)
app.use("/",GymRouter)
app.use("/",MemberCredentialRouter)
app.use("/",AdminCredentialRouter)
app.use("/",GetGymListRouter)
app.use("/",GymSubscriptionRouter)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});