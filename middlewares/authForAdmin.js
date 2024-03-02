const AdminCredential = require("../models/adminCredential");
const MemberCredential = require("../models/memberCredential");
const jwt = require('jsonwebtoken');

const jwtKey = "KEY";

async function authJwtMiddlewareForAdmin(req, res, next) {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

        if (!token) {
            throw new Error('Authorization header missing or malformed');
        }

        const decodedToken = jwt.verify(token, jwtKey);
        const emailIdFromToken = decodedToken.emailId;
        const adminCredentials = await AdminCredential.findOne({ emailId: emailIdFromToken });

        console.log(decodedToken,emailIdFromToken)

        if (!adminCredentials) {
            throw new Error('Invalid user ID');
        }

        console.log(adminCredentials);
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: error.message || 'Unauthorized' });
    }
}

module.exports = { authJwtMiddlewareForAdmin };
