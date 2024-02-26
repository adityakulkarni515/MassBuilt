const AdminChanges = require("../models/adminChanges");
const Gym = require("../models/gym");


async function updatePendingAdminChanges() {
  try {
    // Find all admin changes with status 'Pending'
    const pendingAdminChanges = await AdminChanges.find({ status: 'Pending' });

    if(!(pendingAdminChanges)){

    return ("no pending admin changes ")
    }


    console.log("hello from 24 script")

    // Process each pending admin change
    for (const adminChange of pendingAdminChanges) {
      // Perform the necessary update operations for each admin change

      const updateGymDetails = await Gym.findOneAndUpdate(
        { gymId: adminChange.gymId },
        {
          $set: {
            changeRequestId: adminChange.changeRequestId,
            subscriptionDetails: adminChange.subscriptionDetails,
            
          }
        }
      );

      const updateAdminChangesDetails = await AdminChanges.findOneAndUpdate(
        { changeRequestId: adminChange.changeRequestId },
        { $set: { status: 'resolved' } }
      );

      console.log('Admin changes updated:', updateGymDetails, updateAdminChangesDetails);
    }
  } catch (error) {
    console.error('Error updating admin changes:', error.message);
  }
}

module.exports={updatePendingAdminChanges}

// Run the updatePendingAdminChanges function every 24 hours
// const intervalInMilliseconds =  60 * 1000; // 24 hours in milliseconds
// setInterval(updatePendingAdminChanges, intervalInMilliseconds);
