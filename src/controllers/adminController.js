const User = require("../models/User");
const bcrypt = require("bcrypt");

let messyDataStore = []; // temporary storage

// ✅ Create Mentor / Student
const createUserByAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!["mentor", "student"].includes(role)) {
      return res.status(400).json({
        message: "Admin can only create mentor or student",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
    });

    res.json({
      success: true,
      data: user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

// ✅ Get all students
const getAllStudents = async (req, res) => {
  const students = await User.find({ role: "student" })
    .populate("assignedMentor", "name email");

  res.json({
    success: true,
    count: students.length,
    data: students,
  });
};

// ✅ Get all mentors
const getAllMentors = async (req, res) => {
  const mentors = await User.find({ role: "mentor" });

  res.json({
    success: true,
    count: mentors.length,
    data: mentors,
  });
};

// ✅ Assign mentor manually
const assignMentor = async (req, res) => {
  const { studentId, mentorId } = req.body;

  const student = await User.findById(studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.assignedMentor = mentorId;
  await student.save();

  res.json({
    success: true,
    message: "Mentor assigned successfully",
  });
};

// ✅ Admin enters messy dataset
const addMessyStudents = (req, res) => {
  const { students } = req.body;

  if (!students || !Array.isArray(students)) {
    return res.status(400).json({
      message: "students array required",
    });
  }

  messyDataStore = students;

  res.json({
    success: true,
    message: "Messy data stored",
    count: students.length,
  });
};

module.exports = {
  createUserByAdmin,
  getAllStudents,
  getAllMentors,
  assignMentor,
  addMessyStudents,
};