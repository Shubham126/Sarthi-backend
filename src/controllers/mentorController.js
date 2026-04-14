const User = require("../models/User");

// 👨‍🏫 Get my students
const getMyStudents = async (req, res) => {
  try {
    const mentorId = req.user.id;

    const students = await User.find({
      role: "student",
      assignedMentor: mentorId,
    }).select("name email");

    res.json({
      success: true,
      count: students.length,
      data: students,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching students",
    });
  }
};

module.exports = { getMyStudents };