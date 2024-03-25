const VerifiedUser = require('../models/adminVerify');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'adityakulkarni515@gmail.com',
        pass: 'fzwijdrlsnsrgbxn'
    }
});

function generateVerificationToken() {
    return crypto.randomBytes(16).toString('hex');
}

async function verifyEmailIdOfUser(req, res) {
    try {
        const { email } = req.body;

        console.log(email)

        if (!email) {
            return res.status(400).json({ message: 'Recipient email address is missing' });
        }
        

        const existingUser = await VerifiedUser.findOne({ email, verified:true });

        console.log(existingUser)

        console.log(existingUser)

        if (existingUser) {
            return res.status(400).json({ message: 'User already verified' });
        }

        const verificationToken = generateVerificationToken();

        await VerifiedUser.create({ email, verificationToken });

        const mailOptions = {
            from: 'adityakulkarni515@gmail.com',
            to: email,
            subject: 'Email Verification',  
            html: `
                <p>Click the following link to verify your email:</p>
                <a href="http://192.168.201.111:4000/verifyEmailOnClick/${verificationToken}">Verify Email</a>
            `
        };
        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Verification email sent' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function verifyEmail(req, res) {
    try {
        const { token } = req.params;

        const user = await VerifiedUser.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: 'Invalid verification token' });
        }
        console.log("user clicked on the gmail verify button")

        user.verified = true;
        user.verificationToken = null;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { verifyEmailIdOfUser, verifyEmail };
