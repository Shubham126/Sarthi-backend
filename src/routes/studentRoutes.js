const express = require("express");
const router = express.Router();

const rawStudents = require("../data/rawStudents");
const cleanStudents = require("../utils/cleanStudents");

// 🔴 RAW DATA
router.get("/students/raw", (req, res) => {
  res.json({
    status: "raw",
    data: rawStudents,
  });
});

// 🟢 CLEANED DATA
router.get("/students", (req, res) => {
  const cleaned = cleanStudents(rawStudents);

  res.json({
    status: "success",
    students: cleaned,
  });
});

// 🧪 CLEAN FROM INPUT (INTERVIEW GOLD)
router.post("/students/clean", (req, res) => {
  const input = req.body.students;

  if (!input) {
    return res.status(400).json({
      message: "students array required",
    });
  }

  const cleaned = cleanStudents(input);

  res.json({
    status: "cleaned",
    students: cleaned,
  });
});

module.exports = router;