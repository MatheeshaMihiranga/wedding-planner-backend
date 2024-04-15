const { tableData } = require("../config/table");
const guestModel = require("../models/guest");
const { ObjectId } = require("mongodb");

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


exports.getUserGuest = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userGuestData = await guestModel.findOne({ userId: userId });
    return res.json({
      success: true,
      data: userGuestData,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.createUserGuestTable = async (req, res, next) => {
  try {
    const checkListId = req.params.id;
    let getUserGuestData = await guestModel.findById(checkListId);
    getUserGuestData.tables.push(req.body);
    const getGuestData = await getUserGuestData.save();
    return res.json({
      success: true,
      data: getGuestData,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.createTableGuest = async (req, res, next) => {
  try {
    const parentId = req.params.id;
    const tableId = req.params.tableId;
    let getGuestData = await guestModel.findById(parentId);
    const objectIndex = getGuestData.tables.findIndex(
      (obj) => obj._id.toString() === tableId
    );
    getGuestData.tables[objectIndex].guest.push(req.body);
    const getGuestDetails = await getGuestData.save();
    return res.json({
      success: true,
      data: getGuestDetails,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.updateTableGuest = async (req, res, next) => {
  try {
    const parentId = req.params.id;
    const tableId = req.params.tableId;
    const guestId = req.params.guestId;
    let getGuestDetails = await guestModel.findById(parentId);
    const objectIndex = getGuestDetails.tables.findIndex(
      (obj) => obj._id.toString() === tableId
    );
    const getTableGuestData =
      getGuestDetails.tables[objectIndex].guest;
    const objectIndexGuest = getTableGuestData.findIndex(
      (obj) => obj._id.toString() === guestId
    );
    getGuestDetails.tables[objectIndex].guest[objectIndexGuest].set(
      req.body
    );
    const getGuestData = await getGuestDetails.save();
    return res.json({
      success: true,
      data: getGuestData,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.updateTableGuest = async (req, res, next) => {
  try {
    const parentId = req.params.id;
    const tableId = req.params.tableId;
    const guestId = req.params.guestId;
    let getGuestDetails = await guestModel.findById(parentId);
    const objectIndex = getGuestDetails.tables.findIndex(
      (obj) => obj._id.toString() === tableId
    );
    const getTableGuestData =
      getGuestDetails.tables[objectIndex].guest;
    const objectIndexGuest = getTableGuestData.findIndex(
      (obj) => obj._id.toString() === guestId
    );
    getGuestDetails.tables[objectIndex].guest[objectIndexGuest].set(
      req.body
    );
    const getGuestData = await getGuestDetails.save();
    return res.json({
      success: true,
      data: getGuestData,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.deleteBudgetExpenses = async (req, res, next) => {
  try {
    const parentId = req.params.id;
    const guestId = req.params.guestId;

    const dataView = await guestModel.findOneAndUpdate(
      { _id: parentId }, // Query to find the document
      { $pull: { "tables.$[outer].guest": { _id: guestId } } }, // Update using $pull to remove the expense
      {
        arrayFilters: [{ "outer.guest._id": guestId }], // Filter to specify which expense to remove
        new: true, // To return the updated document
      }
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

exports.updateTableData = async (req, res, next) => {
  try {
    const parentId = req.params.id;
    const tableId = req.params.tableId;
    const guestId = req.params.guestId;
    let getGuestDetails = await guestModel.findById(parentId);
    const objectIndex = getGuestDetails.tables.findIndex(
      (obj) => obj._id.toString() === tableId
    );
    getGuestDetails.tables[objectIndex].set(
      req.body
    );
    const getGuestData = await getGuestDetails.save();
    return res.json({
      success: true,
      data: getGuestData,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.deleteTableData = async (req, res, next) => {
  try {
    const parentId = req.params.id;
    const tableId = req.params.tableId;
    let dataView =  await guestModel.updateOne(
      { _id: ObjectId(parentId) },
      { $pull: { tables: { _id: { $eq: ObjectId(tableId) } } } }
  );
    return res.json({
      success: true,
      data: dataView,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
