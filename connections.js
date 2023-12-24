const mongoose=require("mongoose")

// Connect to MongoDB

async function connectToMongoDb(url){

    return mongoose.connect(url);
}

module.exports={connectToMongoDb}
