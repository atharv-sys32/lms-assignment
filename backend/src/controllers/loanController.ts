import { Request, Response } from 'express';
import { User } from '../models/User';
import { Loan, LoanStatus } from '../models/Loan';
import { checkEligibility } from '../utils/bre';

export const savePersonalDetails = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { pan, dob, monthlySalary, employmentMode } = req.body;

    const age = new Date().getFullYear() - new Date(dob).getFullYear();

    const { isValid, errors } = checkEligibility(age, monthlySalary, employmentMode, pan);
    if (!isValid) {
      return res.status(400).json({ error: 'BRE Rejected', details: errors });
    }

    user.pan = pan;
    user.dob = dob;
    user.monthlySalary = monthlySalary;
    user.employmentMode = employmentMode;
    await user.save();

    res.json({ message: 'Personal details saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const uploadSalarySlip = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a file' });
    }

    user.salarySlipUrl = req.file.path;
    await user.save();

    res.json({ message: 'Salary slip uploaded successfully', url: req.file.path });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const applyLoan = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { amount, tenure } = req.body; // tenure in days

    // Basic Validation
    if (!user.pan || !user.salarySlipUrl) {
      return res.status(400).json({ error: 'Please complete all previous steps before applying' });
    }

    const interestRate = 12; // 12% p.a.
    const si = (amount * interestRate * tenure) / (365 * 100);
    const totalRepayment = amount + si;

    const loan = await Loan.create({
      borrower: user._id,
      amount,
      tenure,
      interestRate,
      totalRepayment,
      status: LoanStatus.Pending
    });

    res.status(201).json({ message: 'Loan applied successfully', loan });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMyLoans = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const loans = await Loan.find({ borrower: user._id }).sort({ createdAt: -1 });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
