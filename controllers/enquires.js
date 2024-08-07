const { Mongoose } = require("mongoose");
const enquireModel = require("../models/enquire");
const { ObjectId } = require("mongodb");

exports.registerEnquires = async (user) => {
  try {
    const enquire = new enquireModel({
      supplierId: user?._id || "",
    });
    return enquire.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getAllEnquireBySupplier = async (req, res, next) => {
  try {
    const supplierId = req.params.id;
    let getReviewData = await enquireModel.findOne({ supplierId: supplierId });
    return res.json({
      success: true,
      data: getReviewData,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.createEnquires = async (req, res, next) => {
  try {
    const enquireId = req.params.id;
    let getEnquireData = await enquireModel.findById(enquireId);
    getEnquireData.enquires.push(req.body);
    const getEnquireDetails = await getEnquireData.save();
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

exports.deleteEnquiry = async (req, res, next) => {
  try {
    const parentId = req.params.id;
    const enquiresId = req.params.enquiresId;
    let dataView =  await enquireModel.updateOne(
      { _id: ObjectId(parentId) },
      { $pull: { enquires: { _id: { $eq: ObjectId(enquiresId) } } } }
  );
    return res.json({
      success: true,
      data: dataView,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateEnquire = async (req, res, next) => {
  try {
    const parentId = req.params.id;
    const enquireId = req.params.enquireId;
    let getEnquireData = await enquireModel.findById(parentId);
    const objectIndex = getEnquireData.enquires.findIndex(
      (obj) => obj._id.toString() === enquireId
    );
    getEnquireData.enquires[objectIndex].set(req.body);
    const getEnquireDetails = await getEnquireData.save();
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

exports.getSupplierListByUserId = async (req, res, next) => {
  const parentId = req.params.id;
  try {
    const supplierData = await enquireModel.aggregate([
      {
        $lookup: {
          from: "suppliers",
          localField: "enquireId",
          foreignField: "supplierId",
          let: { supplierId: "$supplierId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", { $toObjectId: "$$supplierId" }] },
              },
            },
          ],
          as: "supplierData",
        },
      },
      {
        $unwind: "$supplierData",
      },
      {
        $project: {
          _id: 1,
          supplierId: 1,
          supplierData: 1,
          enquires: {
            $filter: {
              input: "$enquires",
              as: "enq",
              cond: {
                $and: [
                  { $eq: ["$$enq.userId", parentId] },
                  { $eq: ["$$enq.status", "accept"] },
                ],
              },
            },
          },
        },
      },
      { $unwind: "$enquires" },
      {
        $group: {
          _id: "$_id",
          supplierId: { $first: "$supplierId" },
          supplierData: { $first: "$supplierData" },
          enquires: {
            $push: {
              userId: "$enquires.userId",
              date: "$enquires.date",
              status: "$enquires.status",
              _id: "$enquires._id",
              supplierData: "$supplierData",
            },
          },
        },
      },
      { $unwind: "$enquires" },
      {
        $project: {
          _id: "$enquires._id",
          userId: "$enquires.userId",
          date: "$enquires.date",
          status: "$enquires.status",
          supplierData: "$enquires.supplierData",
        },
      },
    ]);
    return res.json({
      success: true,
      data: supplierData,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};
