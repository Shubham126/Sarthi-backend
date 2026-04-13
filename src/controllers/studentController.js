const studentsData = require("../data/students");
const cleanStudents = require("../utils/cleanStudents");
const leads = require("../data/leads");
const students = [];

const getStudents = (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    // Clean data first
    let cleaned = cleanStudents(studentsData).students;

    // 🔍 Filtering
    if (status) {
      cleaned = cleaned.filter(
        (student) => student.status === status
      );
    }

    // 📄 Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedData = cleaned.slice(startIndex, endIndex);

    res.json({
      success: true,
      total: cleaned.length,
      page: Number(page),
      limit: Number(limit),
      data: paginatedData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing students data"
    });
  }
};

const createStudent = (req, res) => {
  try {
    const { name, email, phone, targetYear } = req.body;

    // ✅ Required fields check
    if (!name || !email || !phone || !targetYear) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Name validation
    if (!/^[A-Za-z\s]+$/.test(name.trim())) {
      return res.status(400).json({
        success: false,
        message: "Name should contain only letters",
      });
    }

    // ✅ Email format validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // ✅ Phone validation
    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone must be 10 digits",
      });
    }

    // ✅ Target year validation
    if (!/^[0-9]{4}$/.test(targetYear)) {
      return res.status(400).json({
        success: false,
        message: "Target year must be 4 digits",
      });
    }

    // ✅ Duplicate email check
    const existing = students.find(
      (s) => s.email.toLowerCase() === email.toLowerCase()
    );

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ✅ Create student
    const newStudent = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase(),
      phone,
      targetYear,
      createdAt: new Date().toISOString(),
    };

    students.push(newStudent);

    return res.status(201).json({
      success: true,
      data: newStudent,
    });

  } catch (error) {
    console.error("CREATE STUDENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error creating student",
    });
  }
};

module.exports = {
  getStudents,
  createStudent,
};