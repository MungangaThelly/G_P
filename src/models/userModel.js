// Define the User class
const users = []; // initiate users array

const hashPassword = (password) => {
  return `hashed_${password}`;
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
/*try {
  const newUser = createUser(3, "alex.jones@example.com", "hashedpassword789", "Alex Jones", "moderator");
  console.log('User created:', newUser);
} catch (error) {
  console.error(error.message);
}
*/
module.exports = User;
