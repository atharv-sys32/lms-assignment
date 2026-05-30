"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loan = exports.LoanStatus = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var LoanStatus;
(function (LoanStatus) {
    LoanStatus["Draft"] = "Draft";
    LoanStatus["Pending"] = "Pending";
    LoanStatus["Approved"] = "Approved";
    LoanStatus["Rejected"] = "Rejected";
    LoanStatus["Disbursed"] = "Disbursed";
    LoanStatus["Closed"] = "Closed"; // Closed
})(LoanStatus || (exports.LoanStatus = LoanStatus = {}));
const loanSchema = new mongoose_1.default.Schema({
    borrower: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    // Step 4 config
    amount: { type: Number, required: true },
    tenure: { type: Number, required: true }, // in days
    interestRate: { type: Number, default: 12 }, // 12% p.a.
    totalRepayment: { type: Number, required: true },
    status: { type: String, enum: Object.values(LoanStatus), default: LoanStatus.Pending },
    rejectionReason: { type: String }, // If rejected
}, { timestamps: true });
exports.Loan = mongoose_1.default.model('Loan', loanSchema);
//# sourceMappingURL=Loan.js.map