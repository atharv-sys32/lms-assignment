"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const User_1 = require("../models/User");
const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token)
            return res.status(401).json({ error: 'Unauthorized' });
        const decoded = jsonwebtoken_1.default.verify(token, env_1.ENV.JWT_SECRET);
        const user = await User_1.User.findById(decoded.userId);
        if (!user)
            return res.status(401).json({ error: 'Unauthorized' });
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
exports.authenticate = authenticate;
const authorize = (roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user)
            return res.status(401).json({ error: 'Unauthorized' });
        if (user.role === User_1.UserRole.Admin) {
            return next(); // Admin can access all modules
        }
        if (!roles.includes(user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map