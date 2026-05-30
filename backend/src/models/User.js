"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "Admin";
    UserRole["Sales"] = "Sales";
    UserRole["Sanction"] = "Sanction";
    UserRole["Disbursement"] = "Disbursement";
    UserRole["Collection"] = "Collection";
    UserRole["Borrower"] = "Borrower";
})(UserRole || (exports.UserRole = UserRole = {}));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.Borrower },
    // Borrower specific details (Step 2)
    pan: { type: String },
    dob: { type: Date },
    monthlySalary: { type: Number },
    employmentMode: { type: String, enum: ['Salaried', 'Self-Employed', 'Unemployed'] },
    // Salary slip file URL (Step 3)
    salarySlipUrl: { type: String },
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map