const bcrypt = require('bcrypt');

const users = [];

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);  // Salt rounds
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
try {
  const newUser = createUser(3, "alex.jones@example.com", "hashedpassword789", "Alex Jones", "moderator");
  console.log('User created:', newUser);
} catch (error) {
  console.error(error.message);
}

module.exports = User;
