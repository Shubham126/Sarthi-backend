const Review = require("../models/Review");

// 👨‍🏫 Mentor adds review
const addReview = async (req, res) => {
  try {
    const mentorId = req.user.id; // from JWT
    const { studentId, review } = req.body;

    if (!studentId || !review) {
      return res.status(400).json({
        success: false,
        message: "studentId and review are required",
      });
    }

    const newReview = await Review.create({
      student: studentId,
      mentor: mentorId,
      review,
    });

    res.status(201).json({
      success: true,
      data: newReview,
    });

  } catch (error) {
    console.error("ADD REVIEW ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error adding review",
    });
  }
};

// 👨‍🎓 Student views their reviews
const getMyReviews = async (req, res) => {
  try {
    const studentId = req.user.id;

    const reviews = await Review.find({ student: studentId })
      .populate("mentor", "name email");

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });

  } catch (error) {
    console.error("GET REVIEW ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
    });
  }
};

module.exports = {
  addReview,
  getMyReviews,
};