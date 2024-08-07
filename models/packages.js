const mongoose = require("mongoose");
const schema = mongoose.Schema;

const packagesDetailsModal = new schema({
  packageName: {
    type: String,
    require: true,
    default: "",
  },
  hallName: {
    type: String,
    require: false,
    default: null,
  },
  maxCount: {
    type: Number,
    require: false,
    default: null,
  },
  price: {
    type: Number,
    require: false,
    default: 0,
  },
  packageDescription: {
    type: String,
    require: false,
    default: "",
  },
});

const packagesModel = new schema({
  supplierId: {
    type: String,
    ref: "Suppliers",
  },
  packages: [packagesDetailsModal],
});

module.exports = mongoose.model("Packages", packagesModel);
