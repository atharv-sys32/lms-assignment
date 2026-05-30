import { Request, Response } from 'express';
import { User, UserRole } from '../models/User';
import { Loan, LoanStatus } from '../models/Loan';
import { Payment } from '../models/Payment';

// Sales: Registered users with NO loans
export const getSalesLeads = async (req: Request, res: Response) => {
  try {
    const borrowers = await User.find({ role: UserRole.Borrower }).select('-password');
    const loans = await Loan.find({}).distinct('borrower');
    
    // Borrowers who haven't applied
    const leads = borrowers.filter(b => !loans.map(id => id.toString()).includes(b._id.toString()));
    
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Sanction: Pending loans
export const getPendingLoans = async (req: Request, res: Response) => {
  try {
    const loans = await Loan.find({ status: LoanStatus.Pending }).populate('borrower', '-password');
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateSanctionStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;

    if (![LoanStatus.Approved, LoanStatus.Rejected].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const loan = await Loan.findById(id);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    
    if (loan.status !== LoanStatus.Pending) return res.status(400).json({ error: 'Loan is not Pending' });

    loan.status = status;
    if (status === LoanStatus.Rejected) loan.rejectionReason = reason;
    await loan.save();

    res.json({ message: `Loan ${status}`, loan });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Disbursement: Approved loans
export const getApprovedLoans = async (req: Request, res: Response) => {
  try {
    const loans = await Loan.find({ status: LoanStatus.Approved }).populate('borrower', '-password');
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const markDisbursed = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const loan = await Loan.findById(id);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    if (loan.status !== LoanStatus.Approved) return res.status(400).json({ error: 'Loan is not Approved' });

    loan.status = LoanStatus.Disbursed;
    await loan.save();

    res.json({ message: 'Loan Disbursed', loan });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Collection: Disbursed loans
export const getDisbursedLoans = async (req: Request, res: Response) => {
  try {
    const loans = await Loan.find({ status: LoanStatus.Disbursed }).populate('borrower', '-password').lean();
    
    // Calculate outstanding balance for each loan
    const loansWithBalance = await Promise.all(loans.map(async (loan) => {
      const payments = await Payment.find({ loan: loan._id });
      const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
      return {
        ...loan,
        totalPaid,
        outstandingBalance: loan.totalRepayment - totalPaid
      };
    }));
    
    res.json(loansWithBalance);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const recordPayment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { utrNumber, amount, date } = req.body;

    const loan = await Loan.findById(id);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    if (loan.status !== LoanStatus.Disbursed) return res.status(400).json({ error: 'Loan is not Disbursed' });

    // Validate UTR uniqueness
    const existingPayment = await Payment.findOne({ utrNumber });
    if (existingPayment) return res.status(400).json({ error: 'UTR Number must be unique' });

    await Payment.create({
      loan: id,
      utrNumber,
      amount,
      date
    });

    // Check if total amount paid >= totalRepayment
    const allPayments = await Payment.find({ loan: id });
    const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0);

    if (totalPaid >= loan.totalRepayment) {
      loan.status = LoanStatus.Closed;
      await loan.save();
      return res.json({ message: 'Payment recorded. Loan fully paid and closed.', loan });
    }

    res.json({ message: 'Payment recorded', totalPaid, totalRepayment: loan.totalRepayment });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
