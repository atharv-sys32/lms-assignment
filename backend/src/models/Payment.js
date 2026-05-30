"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    loan: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Loan', required: true },
    utrNumber: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
}, { timestamps: true });
exports.Payment = mongoose_1.default.model('Payment', paymentSchema);
//# sourceMappingURL=Payment.js.map