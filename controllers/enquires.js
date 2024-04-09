const { Mongoose } = require("mongoose");
const enquireModel = require("../models/enquire");


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
      throw new Error(error.message);
    }
  };