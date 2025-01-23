const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    email: "john.doe@example.com",
    password: bcrypt.hashSync("password123", 10), // Securely hashed password
    name: "John Doe",
    role: "admin",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    password: bcrypt.hashSync("password456", 10), // Securely hashed password
    name: "Jane Smith",
    role: "user",
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-02-15"),
  },
  {
    id: 3,
    email: "alex.jones@example.com",
    password: bcrypt.hashSync("password789", 10), // Securely hashed password
    name: "Alex Jones",
    role: "moderator",
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-03-10"),
  },
];

module.exports = users;

