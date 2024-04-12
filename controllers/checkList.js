const { checkList } = require("../config/checkList");
const checkListModel = require("../models/checkList");

exports.registerCheckList = async (user) => {
  try {
    const checkListData = new checkListModel({
      userId: user?._id || "",
      checkListData: checkList
    });
    return checkListData.save();
  } catch (error) {
    throw new Error(error.message);
  }
};
