




async function generateAdminId(req, res, next) {
    try {
        // Generate a random number between 100000000 and 999999999
        const adminId = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
        
        // Attach the generated gymId to the request object
        req.body.adminId = adminId;

        console.log("hi middleware from adminid creation",req.adminId)

        // Call next() to pass control to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal error, something went wrong" });
    }
}




async function generategymId(req, res, next) {
    try {
        // Generate a random number between 100000000 and 999999999
        const gymId = Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;
        
        // Attach the generated gymId to the request object
        req.body.gymId = gymId;

        console.log("hi middleware from gymid creation",gymId)

        // Call next() to pass control to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal error, something went wrong" });
    }
}


module.exports={
    generateAdminId,generategymId
}