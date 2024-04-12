const mongoose = require("mongoose");
const schema = mongoose.Schema;

const guestDetails = new schema({
  name: {
    type: String,
    require: false,
    default: "",
  },
  email: {
    type: String,
    require: false,
    default: "",
  },
  status: {
    type: String,
    require: false,
    default: "awaiting",
  },
});

const tableDetailsModel = new schema({
  tableName: {
    type: String,
    require: true,
    default: "",
  },
  guest:[guestDetails]
});

const guestModel = new schema({
  userId: {
    type: String,
    ref: "Users",
  },
  tables: [tableDetailsModel],
});

module.exports = mongoose.model("Guests", guestModel);