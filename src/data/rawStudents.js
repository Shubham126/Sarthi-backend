module.exports = [
  {
    id: "stu_001",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    created_at: "2026/04/01",
    status: "active",
    unusedField: "abc",
  },
  {
    id: "stu_001", // duplicate
    name: "Rahul Sharma",
    email: "rahul@example.com",
    created_at: "01-04-2026",
    status: "active",
  },
  {
    id: "stu_002",
    name: "Amit Verma",
    email: "amit@example.com",
    created_at: "April 1, 2026",
    status: "inactive",
    unusedField: "xyz",
  },
  {
    id: "stu_003",
    name: "Sneha Gupta",
    email: "sneha@example.com",
    created_at: "April 1, 2026",
    status: "inactive",
    unusedField: "xyz",
  },
];