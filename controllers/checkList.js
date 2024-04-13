const { checkList } = require("../config/checkList");
const checkListModel = require("../models/checkList");
const { ObjectId } = require("mongodb");

exports.registerCheckList = async (user) => {
  try {
    const checkListData = new checkListModel({
      userId: user?._id || "",
      checkListData: checkList,
    });
    return checkListData.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getUserCheckList = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userCheckListData = await checkListModel.findOne({ userId: userId });

    return res.json({
      success: true,
      data: userCheckListData,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.createCheckList = async (req, res, next) => {
  try {
    const checkListId = req.params.id;
    let getCheckListData = await checkListModel.findById(checkListId);
    getCheckListData.checkListData.push(req.body);
    const getEnquireDetails = await getCheckListData.save();
    return res.json({
      success: true,
      data: getEnquireDetails,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.updateCheckList = async (req, res, next) => {
  try {
    const parentId = req.params.id;
    const checkListId = req.params.checkListId;
    let getCheckListData = await checkListModel.findById(parentId);
    const objectIndex = getCheckListData.checkListData.findIndex(
      (obj) => obj._id.toString() === checkListId
    );
    getCheckListData.checkListData[objectIndex].set(req.body);
    const getEnquireDetails = await getCheckListData.save();
    return res.json({
      success: true,
      data: getEnquireDetails,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.deleteCheckList = async (req, res, next) => {
  try {
    const parentId = req.params.id;
    const checkListId = req.params.checkListId;
    let dataView = await checkListModel.updateOne(
      { _id: ObjectId(parentId) },
      { $pull: { checkListData: { _id: { $eq: ObjectId(checkListId) } } } }
    );
    return res.json({
      success: true,
      data: dataView,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};
