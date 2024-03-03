// middleware/normalizeEmail.js

function normalizeEmail(req, res, next) {
    // Check if emailId exists in the request body
    if (req.body && req.body.emailId) {
        // Convert emailId to lowercase
        req.body.emailId = req.body.emailId.toLowerCase();
    }
    // Call the next middleware in the chain
    next();
}

module.exports ={ normalizeEmail};
