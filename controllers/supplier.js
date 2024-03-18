const supplierModel = require("../models/supplier");
const { supplierUpdateValidation } = require("../validation/supplier");


exports.registerSupplier = async (user) => {
  try {
    const supplier = new supplierModel({
      userId: user?._id || "",
    });
    return supplier.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateSupplierData = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await supplierUpdateValidation.validate(req.body);
    const updateUser = await supplierModel.findByIdAndUpdate(
      { _id: userId },
      req.body,
      {
        new: true,
      }
    );
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
    const getAllSupplierData = await supplierModel.find().populate('userId');
    return res.json({
      success: true,
      data: getAllSupplierData,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
