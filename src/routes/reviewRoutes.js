const express = require("express");
const router = express.Router();

const {
  addReview,
  getMyReviews,
} = require("../controllers/reviewController");

const protect = require("../middleware/auth");

// mentor only
router.post("/reviews", protect(["mentor"]), addReview);

// student only
router.get("/reviews", protect(["student"]), getMyReviews);

module.exports = router;