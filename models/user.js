const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userModal = new schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: false,
  },
  location:{
    type: String,
    require: false,
  },
  supplierId: {
    type: String,
    require: false,
    ref: 'Suppliers'
  },
  role: {
    type: String,
    require: true,
  },
  resetPasswordToken: String,
  resetPasswordDate: Date,
});

module.exports = mongoose.model("Users", userModal);
