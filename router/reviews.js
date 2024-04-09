const express = require("express");
const { writeReview } = require("../controllers/reviewController");

const router = express.Router();

// post a new review
router.post("/writeReview", writeReview);

module.exports = router;