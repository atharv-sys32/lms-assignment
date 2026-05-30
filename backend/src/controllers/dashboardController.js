"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordPayment = exports.getDisbursedLoans = exports.markDisbursed = exports.getApprovedLoans = exports.updateSanctionStatus = exports.getPendingLoans = exports.getSalesLeads = void 0;
const User_1 = require("../models/User");
const Loan_1 = require("../models/Loan");
const Payment_1 = require("../models/Payment");
// Sales: Registered users with NO loans
const getSalesLeads = async (req, res) => {
    try {
        const borrowers = await User_1.User.find({ role: User_1.UserRole.Borrower }).select('-password');
        const loans = await Loan_1.Loan.find({}).distinct('borrower');
        // Borrowers who haven't applied
        const leads = borrowers.filter(b => !loans.map(id => id.toString()).includes(b._id.toString()));
        res.json(leads);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getSalesLeads = getSalesLeads;
// Sanction: Pending loans
const getPendingLoans = async (req, res) => {
    try {
        const loans = await Loan_1.Loan.find({ status: Loan_1.LoanStatus.Pending }).populate('borrower', '-password');
        res.json(loans);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getPendingLoans = getPendingLoans;
const updateSanctionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, reason } = req.body;
        if (![Loan_1.LoanStatus.Approved, Loan_1.LoanStatus.Rejected].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const loan = await Loan_1.Loan.findById(id);
        if (!loan)
            return res.status(404).json({ error: 'Loan not found' });
        if (loan.status !== Loan_1.LoanStatus.Pending)
            return res.status(400).json({ error: 'Loan is not Pending' });
        loan.status = status;
        if (status === Loan_1.LoanStatus.Rejected)
            loan.rejectionReason = reason;
        await loan.save();
        res.json({ message: `Loan ${status}`, loan });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.updateSanctionStatus = updateSanctionStatus;
// Disbursement: Approved loans
const getApprovedLoans = async (req, res) => {
    try {
        const loans = await Loan_1.Loan.find({ status: Loan_1.LoanStatus.Approved }).populate('borrower', '-password');
        res.json(loans);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getApprovedLoans = getApprovedLoans;
const markDisbursed = async (req, res) => {
    try {
        const { id } = req.params;
        const loan = await Loan_1.Loan.findById(id);
        if (!loan)
            return res.status(404).json({ error: 'Loan not found' });
        if (loan.status !== Loan_1.LoanStatus.Approved)
            return res.status(400).json({ error: 'Loan is not Approved' });
        loan.status = Loan_1.LoanStatus.Disbursed;
        await loan.save();
        res.json({ message: 'Loan Disbursed', loan });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.markDisbursed = markDisbursed;
// Collection: Disbursed loans
const getDisbursedLoans = async (req, res) => {
    try {
        const loans = await Loan_1.Loan.find({ status: Loan_1.LoanStatus.Disbursed }).populate('borrower', '-password');
        res.json(loans);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getDisbursedLoans = getDisbursedLoans;
const recordPayment = async (req, res) => {
    try {
        const id = req.params.id;
        const { utrNumber, amount, date } = req.body;
        const loan = await Loan_1.Loan.findById(id);
        if (!loan)
            return res.status(404).json({ error: 'Loan not found' });
        if (loan.status !== Loan_1.LoanStatus.Disbursed)
            return res.status(400).json({ error: 'Loan is not Disbursed' });
        // Validate UTR uniqueness
        const existingPayment = await Payment_1.Payment.findOne({ utrNumber });
        if (existingPayment)
            return res.status(400).json({ error: 'UTR Number must be unique' });
        await Payment_1.Payment.create({
            loan: id,
            utrNumber,
            amount,
            date
        });
        // Check if total amount paid >= totalRepayment
        const allPayments = await Payment_1.Payment.find({ loan: id });
        const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0);
        if (totalPaid >= loan.totalRepayment) {
            loan.status = Loan_1.LoanStatus.Closed;
            await loan.save();
            return res.json({ message: 'Payment recorded. Loan fully paid and closed.', loan });
        }
        res.json({ message: 'Payment recorded', totalPaid, totalRepayment: loan.totalRepayment });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.recordPayment = recordPayment;
//# sourceMappingURL=dashboardController.js.map