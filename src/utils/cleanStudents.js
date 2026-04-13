const dayjs = require("dayjs");

const normalizeDate = (date) => {
  const formats = [
    "YYYY/MM/DD",
    "DD-MM-YYYY",
    "MMMM D, YYYY"
  ];

  for (let format of formats) {
    const parsed = dayjs(date, format, true);
    if (parsed.isValid()) {
      return parsed.format("YYYY-MM-DD");
    }
  }

  return null;
};

const cleanStudents = (data) => {
  const uniqueMap = new Map();

  data.students.forEach((student) => {
    const id = student.id;

    if (!uniqueMap.has(id)) {
      const cleanedStudent = {
        id: student.id,
        name: student.name,
        email: student.email,
        status: student.status,
        createdAt: normalizeDate(
          student.created_at || student.createdAt
        )
      };

      uniqueMap.set(id, cleanedStudent);
    }
  });

  return {
    status: data.status,
    students: Array.from(uniqueMap.values())
  };
};

module.exports = cleanStudents;