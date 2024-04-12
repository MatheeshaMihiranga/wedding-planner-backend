const mongoose = require("mongoose");
const schema = mongoose.Schema;

const checkListDetailsModel = new schema({
  name: {
    type: String,
    require: true,
    default: "",
  },
  category: {
    type: String,
    require: false,
    default: "",
  },
  status: {
    type: String,
    require: false,
    default: false,
  },
});

const checkListModel = new schema({
  userId: {
    type: String,
    ref: "Users",
  },
  checkListData: [checkListDetailsModel],
});

module.exports = mongoose.model("CheckList", checkListModel);