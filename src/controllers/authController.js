const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    let assignedMentor = null;

    // 🧠 AUTO ASSIGN ONLY FOR STUDENTS
    if (role === "student") {
      const mentors = await User.find({ role: "mentor" });

      if (mentors.length > 0) {
        // 🔢 Count students per mentor
        const mentorLoad = await Promise.all(
          mentors.map(async (mentor) => {
            const count = await User.countDocuments({
              assignedMentor: mentor._id,
            });

            return {
              mentor,
              count,
            };
          })
        );

        // 📉 Find minimum load
        const minLoad = Math.min(...mentorLoad.map((m) => m.count));

        // 🎯 Get all mentors with min load
        const leastLoadedMentors = mentorLoad.filter(
          (m) => m.count === minLoad
        );

        // 🎲 Random among least loaded
        const selected =
          leastLoadedMentors[
            Math.floor(Math.random() * leastLoadedMentors.length)
          ];

        assignedMentor = selected.mentor._id;
      }
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      assignedMentor,
    });

    res.json(user);

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({ token, user });
};

module.exports = { register, login };