const mongoose = require("mongoose");
const schema = mongoose.Schema;

const supplierModel = new schema({
  serviceName: {
    type: String,
    require: true,
    default: "",
  },
  location: {
    type: String,
    require: false,
    default: "",
  },
  description: {
    type: String,
    require: false,
    default: "",
  },
  categoryType: {
    type: String,
    require: false,
    default: "",
  },
  webLink: {
    type: String,
    require: false,
    default: "",
  },
  packages: {
    type: Array,
    require: false,
    default: [],
  },
  userId: {
    type: String,
    ref: 'Users'
  },
  images: {
    type: Array,
    require: false,
    default: [],
  },
});

module.exports = mongoose.model("Suppliers", supplierModel);
