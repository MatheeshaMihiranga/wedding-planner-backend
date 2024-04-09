const { Mongoose } = require("mongoose");
const packagesModal = require("../models/packages");
const reviewModel = require("../models/review");
const enquireModel = require("../models/enquire");

const { ObjectId } = require("mongodb");

exports.registerPackages = async (user) => {
  try {
    const package = new packagesModal({
      supplierId: user?._id || "",
    });
    return package.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createPackages = async (req, res, next) => {
  try {
    const packageId = req.params.id;
    let getPackageData = await packagesModal.findById(packageId);
    getPackageData.packages.push(req.body);
    const getPackageDetails = await getPackageData.save();
    return res.json({
      success: true,
      data: getPackageDetails,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updatePackageData = async (req, res, next) => {
  try {
    const parentId = req.params.id;
    const packageId = req.params.packageId;
    let getPackageData = await packagesModal.findById(parentId);
    const objectIndex = getPackageData.packages.findIndex(
      (obj) => obj._id.toString() === packageId
    );
    getPackageData.packages[objectIndex].set(req.body);
    const getPackageDetails = await getPackageData.save();
    return res.json({
      success: true,
      data: getPackageDetails,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deletePackageData = async (req, res, next) => {
    try {
      const parentId = req.params.id;
      const packageId = req.params.packageId;
      let dataView =  await packagesModal.updateOne(
        { _id: ObjectId(parentId) },
        { $pull: { packages: { _id: { $eq: ObjectId(packageId) } } } }
    );
      return res.json({
        success: true,
        data: dataView,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
