const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");

const {
  createUserByAdmin,
  getAllStudents,
  getAllMentors,
  assignMentor,
  addMessyStudents,
} = require("../controllers/adminController");

// 🔐 Only admin allowed
router.post("/admin/create-user", protect(["admin"]), createUserByAdmin);

router.get("/admin/students", protect(["admin"]), getAllStudents);

router.get("/admin/mentors", protect(["admin"]), getAllMentors);

router.post("/admin/assign", protect(["admin"]), assignMentor);

// messy data input
router.post("/admin/messy-data", protect(["admin"]), addMessyStudents);

module.exports = router;