const { tableData } = require("../config/table");
const guestModel = require("../models/guest");

exports.registerGuest = async (user) => {
  try {
    const guest = new guestModel({
      userId: user?._id || "",
      tables: tableData
    });
    return guest.save();
  } catch (error) {
    throw new Error(error.message);
  }
};
