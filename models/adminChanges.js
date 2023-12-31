const mongoose = require('mongoose');

const adminChangesSchema = new mongoose.Schema({



    changeRequestId: {
      type: String,
      required: true,
    },
    adminId: {
      type: Number,
      required: true,
    },
    gymId: {
        type: Number,
        required: true,
      },

      status: {
        type: String,
        required: true,
      },

    subscriptionDetails: [
      {
        type: Map,
        of: Map,
      },
    ],
    changeDate: {
      type: Date,
      required: true,
    },


  });
  
  const AdminChanges = mongoose.model('adminChange', adminChangesSchema);
  
  module.exports = AdminChanges;
  
