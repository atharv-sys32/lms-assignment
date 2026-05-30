"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("./models/User");
dotenv_1.default.config();
const seed = async () => {
    await mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lms');
    const password = await bcrypt_1.default.hash('password123', 10);
    const roles = [
        { email: 'admin@lms.com', role: User_1.UserRole.Admin, fullName: 'Admin User' },
        { email: 'sales@lms.com', role: User_1.UserRole.Sales, fullName: 'Sales Exec' },
        { email: 'sanction@lms.com', role: User_1.UserRole.Sanction, fullName: 'Sanction Exec' },
        { email: 'disbursement@lms.com', role: User_1.UserRole.Disbursement, fullName: 'Disbursement Exec' },
        { email: 'collection@lms.com', role: User_1.UserRole.Collection, fullName: 'Collection Exec' },
        { email: 'borrower@lms.com', role: User_1.UserRole.Borrower, fullName: 'Borrower User' },
    ];
    for (const r of roles) {
        const existing = await User_1.User.findOne({ email: r.email });
        if (!existing) {
            await User_1.User.create({ ...r, password });
            console.log(`Created user ${r.email}`);
        }
        else {
            console.log(`User ${r.email} already exists`);
        }
    }
    console.log('Seeding done.');
    process.exit(0);
};
seed().catch(console.error);
//# sourceMappingURL=seed.js.map