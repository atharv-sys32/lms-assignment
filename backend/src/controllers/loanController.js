"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyLoans = exports.applyLoan = exports.uploadSalarySlip = exports.savePersonalDetails = void 0;
const Loan_1 = require("../models/Loan");
const bre_1 = require("../utils/bre");
const savePersonalDetails = async (req, res) => {
    try {
        const user = req.user;
        const { pan, dob, monthlySalary, employmentMode } = req.body;
        const age = new Date().getFullYear() - new Date(dob).getFullYear();
        const { isValid, errors } = (0, bre_1.checkEligibility)(age, monthlySalary, employmentMode, pan);
        if (!isValid) {
            return res.status(400).json({ error: 'BRE Rejected', details: errors });
        }
        user.pan = pan;
        user.dob = dob;
        user.monthlySalary = monthlySalary;
        user.employmentMode = employmentMode;
        await user.save();
        res.json({ message: 'Personal details saved successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.savePersonalDetails = savePersonalDetails;
const uploadSalarySlip = async (req, res) => {
    try {
        const user = req.user;
        if (!req.file) {
            return res.status(400).json({ error: 'Please upload a file' });
        }
        user.salarySlipUrl = req.file.path;
        await user.save();
        res.json({ message: 'Salary slip uploaded successfully', url: req.file.path });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.uploadSalarySlip = uploadSalarySlip;
const applyLoan = async (req, res) => {
    try {
        const user = req.user;
        const { amount, tenure } = req.body; // tenure in days
        // Basic Validation
        if (!user.pan || !user.salarySlipUrl) {
            return res.status(400).json({ error: 'Please complete all previous steps before applying' });
        }
        const interestRate = 12; // 12% p.a.
        const si = (amount * interestRate * tenure) / (365 * 100);
        const totalRepayment = amount + si;
        const loan = await Loan_1.Loan.create({
            borrower: user._id,
            amount,
            tenure,
            interestRate,
            totalRepayment,
            status: Loan_1.LoanStatus.Pending
        });
        res.status(201).json({ message: 'Loan applied successfully', loan });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.applyLoan = applyLoan;
const getMyLoans = async (req, res) => {
    try {
        const user = req.user;
        const loans = await Loan_1.Loan.find({ borrower: user._id }).sort({ createdAt: -1 });
        res.json(loans);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getMyLoans = getMyLoans;
//# sourceMappingURL=loanController.js.map