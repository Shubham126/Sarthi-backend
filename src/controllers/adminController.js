const User = require("../models/User");

// assign mentor
const assignMentor = async (req, res) => {
  const { studentId, mentorId } = req.body;

  const student = await User.findById(studentId);

  student.assignedMentor = mentorId;
  await student.save();

  res.json({ message: "Mentor assigned" });
};

// view mapping
const getMentorStudents = async (req, res) => {
  const mentors = await User.find({ role: "mentor" });

  const result = await Promise.all(
    mentors.map(async (mentor) => {
      const students = await User.find({
        assignedMentor: mentor._id,
      });

      return {
        mentor: mentor.name,
        students,
      };
    })
  );

  res.json(result);
};

module.exports = { assignMentor, getMentorStudents };