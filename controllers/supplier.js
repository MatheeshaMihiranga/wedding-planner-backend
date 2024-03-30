const { Mongoose } = require("mongoose");
const supplierModel = require("../models/supplier");
const { supplierUpdateValidation } = require("../validation/supplier");
const { ObjectId } = require("mongodb");
const { registerPackages } = require("./packages");

const updateSupplierDetails = async (userId, body) => {
  const updateUser = await supplierModel
    .findByIdAndUpdate(userId, body, {
      new: true,
    })
    .populate("packageId");
  return updateUser;
};

exports.registerSupplier = async (user) => {
  try {
    const supplier = new supplierModel({
      userId: user?._id || "",
    });
    const getSupplierData = await supplier.save();
    const getPackageData = await registerPackages(getSupplierData);
    const updateSupplierData = await updateSupplierDetails(
      getSupplierData?._id,
      {
        packageId: getPackageData._id,
      }
    );
    return updateSupplierData;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateSupplierData = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await supplierUpdateValidation.validate(req.body);
    const updateUser = await updateSupplierDetails(userId, req.body);
    return res.json({
      success: true,
      data: updateUser,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getAllSuppliers = async (req, res, next) => {
  try {
    const getAllSupplierData = await supplierModel.find();
    return res.json({
      success: true,
      data: getAllSupplierData,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getSupplierById = async (req, res, next) => {
  try {
    const supplierId = req.params.id;
    if (supplierId) {
      const supplierData = await supplierModel
        .findOne({ _id: supplierId })
        .populate("packageId")
        .exec();

      res.json({
        success: true,
        data: supplierData,
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.searchSupplier = async (req, res, next) => {
  try {
    const { type, date, location, rating, maxCount } = req.body;
    const supplierData = await supplierModel.aggregate([
      { $match: { categoryType: { $eq: type } } },
      {
        $match: {
          $expr: {
            $or: [{ $ne: [date, null] }, { $ne: ["$unavailableDates", date] }],
          },
        },
      },
      {
        $match: {
          $expr: {
            $or: [{ $eq: [location, null] }, { $eq: ["$location", location] }],
          },
        },
      },
      {
        $match: {
          $expr: {
            $or: [{ $eq: [rating, null] }, { $eq: ["$rating", rating] }],
          },
        },
      },
      {
        $lookup: {
          from: "packages",
          localField: "supplierId",
          foreignField: "packageId",
          let: { package_Id: "$packageId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", { $toObjectId: "$$package_Id" }] },
              },
            },
          ],
          as: "packagesData",
        },
      },
      {
        $unwind: "$packagesData" 
      },
      {
        $unwind: "$packagesData.packages"
      },
      {
        $match: {
          $expr: {
            $or: [{ $eq: [maxCount, null] }, { $eq: ["$packagesData.packages.maxCount", maxCount] }],
          },
        },
      },
    ]);
    res.json({
      success: true,
      data: supplierData,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
