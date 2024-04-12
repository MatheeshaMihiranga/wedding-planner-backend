const { Mongoose } = require("mongoose");
const reviewModel = require("../models/review");
const { updateSupplierData } = require("./supplier");
const supplierModel = require("../models/supplier");

const updateSupplierRating = async (userId, body) => {
  const updateUser = await supplierModel
    .findByIdAndUpdate(userId, body, {
      new: true,
    })
  return updateUser;
};

exports.registerReviews = async (user) => {
  try {
    const review = new reviewModel({
      supplierId: user?._id || "",
    });
    return review.save();
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.getAllReviewBySupplier = async (req, res, next) => {
  try {
    const supplierId = req.params.id;
    let getReviewData = await reviewModel.findOne({ supplierId: supplierId });
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

exports.createReviews = async (req, res, next) => {
  try {
    const supplierId = req.params.supplierId;
    const reviewId = req.params.id;
    let getReviewData = await reviewModel.findById(reviewId);
    getReviewData.reviews.push(req.body);
    const getReviewDetails = await getReviewData.save();
    const getReviewCount = getReviewData.reviews.length;
    const getReviewResultCount = getReviewData.reviews.reduce(
      (result, data) => {
        return (result += data.reviewCount);
      },
      0
    );
    const getSummaryOfReviewCount = Math.trunc(
      getReviewResultCount / getReviewCount
    );
    await updateSupplierRating(supplierId, {
      rating: getSummaryOfReviewCount,
    });
    return res.json({
      success: true,
      data: getReviewDetails,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const parentId = req.params.id;
    const reviewId = req.params.reviewId;
    let getReviewData = await reviewModel.findById(parentId);
    const objectIndex = getReviewData.reviews.findIndex(
      (obj) => obj._id.toString() === reviewId
    );
    getReviewData.reviews[objectIndex].set(req.body);
    const getReviewDetails = await getReviewData.save();
    return res.json({
      success: true,
      data: getReviewDetails,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};
