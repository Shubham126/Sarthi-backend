const normalizeDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
};

const cleanStudents = (students) => {
  const map = new Map();

  students.forEach((s) => {
    if (!map.has(s.id)) {
      map.set(s.id, {
        id: s.id,
        name: s.name,
        email: s.email,
        createdAt: normalizeDate(s.created_at),
        status: s.status,
      });
    }
  });

  return Array.from(map.values());
};

module.exports = cleanStudents;