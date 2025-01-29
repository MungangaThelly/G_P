const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userHandler = require('../domain/user_handler');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_SECRET_TOKEN || "secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refreshSecret";

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
    return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required." });
        }

        const hash = await hashPassword(password);

        const user = {
            email,
            name,
            password: hash,
            role
        };

        const createdUser = await userHandler.create(user); 
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await userHandler.readByUserName(name); 

        if (!user) {
            console.log('User not found:', name);
            return res.status(404).json({ message: "User not found!" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const accessToken = generateAccessToken({ name: user.name, role: user.role });
        const refreshToken = generateRefreshToken({ name: user.name, role: user.role });

        res.cookie('accessToken', accessToken, { httpOnly: true, secure: false });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });

        return res.status(200).json({ message: "Successfully logged in", accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

exports.secure = (req, res) => {
    res.send('Secure data accessed');
};

exports.adminOnly = (req, res) => {
    res.send('Admin data accessed');
};
