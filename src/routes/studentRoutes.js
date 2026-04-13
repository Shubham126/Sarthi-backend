const express = require("express");
const router = express.Router();

const { getStudents, createStudent } = require("../controllers/studentController");

router.get("/students", getStudents);
router.post("/students", createStudent);

module.exports = router;