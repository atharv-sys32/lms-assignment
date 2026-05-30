"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const env_1 = require("../config/env");
const register = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        const existing = await User_1.User.findOne({ email });
        if (existing)
            return res.status(400).json({ error: 'Email already in use' });
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await User_1.User.create({ email, password: hashedPassword, fullName });
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.User.findOne({ email });
        if (!user)
            return res.status(400).json({ error: 'Invalid credentials' });
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ error: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, env_1.ENV.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, role: user.role, email: user.email, fullName: user.fullName });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map