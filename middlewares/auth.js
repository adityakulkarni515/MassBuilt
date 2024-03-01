const MemberCredential = require("../models/memberCredential");
const jwt = require('jsonwebtoken');

const jwtKey = "KEY";

async function authJwtMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

        if (!token) {
            throw new Error('Authorization header missing or malformed');
        }

        const decodedToken = jwt.verify(token, jwtKey);
        const emailIdFromToken = decodedToken.emailId;
        const memberCredentials = await MemberCredential.findOne({ emailId: emailIdFromToken });

        console.log(decodedToken,emailIdFromToken)

        if (!memberCredentials) {
            throw new Error('Invalid user ID');
        }

        console.log(memberCredentials);
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: error.message || 'Unauthorized' });
    }
}

module.exports = { authJwtMiddleware };
