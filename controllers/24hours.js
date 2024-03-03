const AdminChanges = require("../models/adminChanges");
const Gym = require("../models/gym");


async function updatePendingAdminChanges() {
  try {

    // Extract year, month, and day components
const year = todaysDate.getUTCFullYear();
const month = String(todaysDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(todaysDate.getUTCDate()).padStart(2, '0');

// Construct the date string
const currentDate= new Date(`${year}-${month}-${day}T00:00:00.000+00:00`);

console.log(currentDate); // Output: "2024-02-25T00:00:00.000+00:00"
    // Find all admin changes with status 'Pending'
    const pendingAdminChanges = await AdminChanges.find({ status: 'Pending' ,changeDate:currentDate});

    console.log(pendingAdminChanges.length)

    if(!(pendingAdminChanges)){
        
    return console.log('no pending admin changes');
    }


    console.log("hello from 24 script")

    // Process each pending admin change
    for (const adminChange of pendingAdminChanges) {
      // Perform the necessary update operations for each admin change

      // Get the current date



      console.log(currentDate)
      if( pendingAdminChanges.changeDate === currentDate){
        
    

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
    else{
      return console.log("")
    }
  }
  
}

  
  
  catch (error) {
    console.error('Error updating admin changes:', error.message);
  }
}

module.exports={updatePendingAdminChanges}

// Run the updatePendingAdminChanges function every 24 hours
// const intervalInMilliseconds =  60 * 1000; // 24 hours in milliseconds
// setInterval(updatePendingAdminChanges, intervalInMilliseconds);
