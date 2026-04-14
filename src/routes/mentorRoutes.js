const express = require("express");
const router = express.Router();

const { getMyStudents } = require("../controllers/mentorController");
const protect = require("../middleware/auth");

router.get("/mentor/students", protect(["mentor"]), getMyStudents);

module.exports = router;