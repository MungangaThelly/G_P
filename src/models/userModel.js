<<<<<<< HEAD
// Define the User class
const users = []; // initiate users array

const hashPassword = (password) => {
  return `hashed_${password}`;
=======
const bcrypt = require('bcrypt');

const users = [];

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);  // Salt rounds
>>>>>>> 89d2f636acf73e4dd7498e9c88326f657ccc2d69
};

class User {
  constructor(id, email, password, name, role) {
    this.id = id;
    this.email = email;
    this.password = hashPassword(password);
    this.name = name;
    this.role = role;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  update(data) {
    if (data.password) {
<<<<<<< HEAD
      data.password= hashPassword(data.password);
  }
    Object.assign(this, data);
    this.updatedAt = new Date();

   }
}

// Validate email format
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Validate password length
const isValidPassword = (password) => password.length >= 6;

const createUser = (id, email, password, name, role) => {
=======
      data.password = hashPassword(data.password);
    }
    Object.assign(this, data);
    this.updatedAt = new Date();
  }
}

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const isValidPassword = (password) => password.length >= 6;

const createUser = (id, email, password, name, role) => {
  // Check if the email already exists in the users array
  if (users.some(user => user.email === email)) {
    throw new Error('Email already in use');
  }
>>>>>>> 89d2f636acf73e4dd7498e9c88326f657ccc2d69
  if (!isValidEmail(email)) {
    throw new Error('Invalid email format');
  }
  if (!isValidPassword(password)) {
    throw new Error('Password must be at least 6 characters long');
  }

  const newUser = new User(id, email, password, name, role);
  users.push(newUser);
  return newUser;
};

// Example: Create a new user
<<<<<<< HEAD
/*try {
=======
try {
>>>>>>> 89d2f636acf73e4dd7498e9c88326f657ccc2d69
  const newUser = createUser(3, "alex.jones@example.com", "hashedpassword789", "Alex Jones", "moderator");
  console.log('User created:', newUser);
} catch (error) {
  console.error(error.message);
}
<<<<<<< HEAD
*/
=======

>>>>>>> 89d2f636acf73e4dd7498e9c88326f657ccc2d69
module.exports = User;
