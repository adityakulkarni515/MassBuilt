const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json())
const userRouter=require("./routes/application")
const AdminRouter=require("./routes/admin")
const {connectToMongoDb}=require("./connections")


connectToMongoDb('mongodb://127.0.0.1:27017/mymongo')


app.use("/",userRouter)
app.use("/",AdminRouter)




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});