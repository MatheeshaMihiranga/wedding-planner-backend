const express = require("express");
const reviews = require("../controllers/reviews");
const { authorize, Roles } = require("../middleware/auth");
const router = express.Router();

router.post("/createReview/:id", authorize(Roles.All), reviews.createReviews);
router.put("/updateReviews/:id/:reviewId", authorize(Roles.All), reviews.updateReview);
router.get("/getAllReviewBySupplier/:id", authorize(Roles.All), reviews.getAllReviewBySupplier);

module.exports = router;
