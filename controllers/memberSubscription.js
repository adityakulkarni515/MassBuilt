const Gym = require("../models/gym");
const Member = require("../models/members");
const Transaction = require("../models/transactions");

async function memberSubscription(req, res, next) {
  try {
      let body = req.body;

      if (!(body.gymId && body.service && body.memberId && body.transactionId && body.startDate && body.duration)) {
          return res.status(400).json({ message: "Request Payload not correct" });
      }

      const checkMemberId = await Member.findOne({ memberId: body.memberId });
      if (!checkMemberId) {
          return res.status(400).json({ message: "This member Id does not exist" });
      }

      const checkGymId = await Gym.findOne({ gymId: body.gymId });
      if (!checkGymId) {
          return res.status(400).json({ message: "This gym Id does not exist" });
      }

      if (checkMemberId.status === "active") {
          return res.status(400).json({ message: "Member is already subscribed to another subscription" });
      }

      const startDate = new Date(body.startDate); // Convert startDate string to Date object

      // Add duration days to the startDate
      const futureDate = new Date(startDate);
      futureDate.setDate(startDate.getDate() + body.duration);
      futureDate.setHours(0, 0, 0, 0);

      // Convert futureDate to IST
      futureDate.setHours(futureDate.getHours() + 5); // Adding 5 hours for IST
      futureDate.setMinutes(futureDate.getMinutes() + 30); // Adding 30 minutes for IST

      // Format the future date
      const formattedFutureDate = futureDate.toISOString().split('T')[0] + 'T00:00:00.000+05:30';
      const endDate = formattedFutureDate;

      // Get the current date in IST
      const currentDateIST = new Date();
      currentDateIST.setHours(currentDateIST.getHours() + 5); // Adding 5 hours for IST
      currentDateIST.setMinutes(currentDateIST.getMinutes() + 30); // Adding 30 minutes for IST

      // Extract year, month, and day components
      const year = currentDateIST.getUTCFullYear();
      const month = String(currentDateIST.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(currentDateIST.getUTCDate()).padStart(2, '0');

      // Construct the date string
      const currentDateForm = new Date(`${year}-${month}-${day}T00:00:00.000+00:00`);


      // Calculate the difference in milliseconds
      const differenceInMilliseconds = ( startDate-currentDateForm);
      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

      console.log(differenceInDays)

      if (differenceInDays > 15 || differenceInDays < 0) {
          return res.status(400).json({ message: "Date is more than 15 days or less than 0 days" });
      }

      const isTransactionPendingCheck = await Transaction.exists({ memberId: body.memberId, status: 'Pending' });

      if (isTransactionPendingCheck) {
          return res.status(400).json({ message: "User has a pending transaction for gym subscription" });
      }

      const addTransactionDetails = await Transaction.create({
          gymId: body.gymId,
          service: body.service,
          subscriptionDetails: body.subscriptionDetails,
          memberId: body.memberId,
          transactionId: body.transactionId,
          startDate: body.startDate,
          duration: body.duration,
          endDate: endDate,
          status: "Pending"
      });


      console.log(body.startDate, currentDateForm)

      if (body.startDate === currentDateForm) {
          next();
      } else {
          return res.status(201).json({ message: "Your subscription will be added on chosen date" });
      }
  } catch (error) {
      console.error("Error in memberSubscription:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { memberSubscription };
