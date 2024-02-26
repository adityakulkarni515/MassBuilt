const moment = require('moment');
const Member = require('../models/members'); // Assuming you have a model for Member
const Transaction = require('../models/transactions'); // Assuming you have a model for Transaction
const Gym = require('../models/gym');

async function getMembersWithExpiryLessThan15Days(req, res) {
    try {
        const { gymId, noOfDay } = req.body;

        // Check if the gymId exists
        const gym = await Gym.findOne({ gymId });
        if (!gym) {
            return res.status(404).json({ message: "Gym not found" });
        }

        // Calculate the expiry date 15 days from now
        const expiryDate = moment().add(noOfDay, 'days').toDate();

        // Find members with expiry less than 15 days from now, active status, and matching gymId
        const members = await Member.aggregate([
            {
                $lookup: {
                    from: 'transactions',
                    localField: 'transactionId',
                    foreignField: 'transactionId',
                    as: 'transaction'
                }
            },
            {
                $match: {
                    $and: [
                        { 'transaction.endDate': { $lt: expiryDate } },
                        { status: 'active' },
                        { gymId }
                    ]
                }
            }
        ]);

        res.status(200).json({ members });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getMembersWithExpiryLessThan15Days };
