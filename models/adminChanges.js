const mongoose = require('mongoose');

const adminChangesSchema = new mongoose.Schema({
    status: {
      type: String,
      required: true,
    },
    adminId: {
      type: String,
      required: true,
    },
    gymId: {
        type: String,
        required: true,
      },

    subscriptionDetails: [
      {
        type: Map,
        of: Map,
      },
    ],
  });
  
  const AdminChanges = mongoose.model('adminChanges', adminChangesSchema);
  
  module.exports = AdminChanges;
  
