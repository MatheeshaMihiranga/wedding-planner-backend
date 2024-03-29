const { Mongoose } = require("mongoose");
const supplierModel = require("../models/supplier");
const { supplierUpdateValidation } = require("../validation/supplier");
const { ObjectId } = require("mongodb");
const { registerPackages } = require("./packages");

const updateSupplierDetails = async (userId,body) =>{
  const updateUser = await supplierModel.findByIdAndUpdate(
    userId,
    body,
    {
      new: true,
    }
  ).populate('packageId');
  return updateUser
}

exports.registerSupplier = async (user) => {
  try {
    const supplier = new supplierModel({
      userId: user?._id || "",
    });
    const getSupplierData = await supplier.save();
    const getPackageData = await registerPackages(getSupplierData);
    const updateSupplierData = await updateSupplierDetails(getSupplierData?._id,{
      packageId:getPackageData._id
    })
    return updateSupplierData
  } catch (error) {
    throw new Error(error.message);
  }
}

exports.updateSupplierData = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await supplierUpdateValidation.validate(req.body);
    const updateUser = await updateSupplierDetails(userId,req.body)
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
    if(supplierId){
      const supplierData = await supplierModel
      .findOne({ _id: supplierId }).populate('packageId')
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
