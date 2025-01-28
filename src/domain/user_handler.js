<<<<<<< HEAD

const users = [
    {
      id: 1,
      email: "john.doe@example.com",
      password: "hashedpassword123",
      name: "John Doe",
      role: "admin",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2023-01-01"),
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      password: "hashedpassword456",
      name: "Jane Smith",
      role: "user",
      createdAt: new Date("2023-02-15"),
      updatedAt: new Date("2023-02-15"),
    },
    {
      id: 3,
      email: "alex.jones@example.com",
      password: "hashedpassword789",
      name: "Alex Jones",
      role: "moderator",
      createdAt: new Date("2023-03-10"),
      updatedAt: new Date("2023-03-10"),
    },
  ];
  
  
  
  module.exports = {
    users,
    create: (user) => {
      const newUser = {
        ...user,
        id: users.length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(newUser);
      return newUser;
    },
  
    readByEmail: (email) => {
      return users.find((user) => user.email === email);
    },
  
    readByUserName: (name) => {
      return users.find((user) => user.name === name);
    },
  
    update: (id, updatedFields) => {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) return null;
  
      users[userIndex] = {
        ...users[userIndex],
        ...updatedFields,
        updatedAt: new Date(),
      };
      return users[userIndex];
    },
  
    delete: (id) => {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) return false;
  
      users.splice(userIndex, 1);
      return true;
    },
  };
  
=======
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

>>>>>>> 89d2f636acf73e4dd7498e9c88326f657ccc2d69
