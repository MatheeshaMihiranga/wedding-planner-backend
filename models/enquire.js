const mongoose = require("mongoose");
const schema = mongoose.Schema;

const enquireDetailsModel = new schema({
  userId: {
    type: String,
    require: true,
    default: "",
  },
  date: {
    type: String,
    require: false,
    default: null,
  },
  status: {
    type: String,
    require: false,
    default: "pending",
  },
});

const enquireModel = new schema({
  supplierId: {
    type: String,
    ref: "Suppliers",
  },
  enquires: [enquireDetailsModel],
});

module.exports = mongoose.model("Enquires", enquireModel);
