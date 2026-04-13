const express = require("express");
const router = express.Router();

const { generateSummary } = require("../controllers/aiController");

router.post("/ai-summary", generateSummary);

module.exports = router;