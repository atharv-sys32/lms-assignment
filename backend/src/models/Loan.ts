import mongoose from 'mongoose';

export enum LoanStatus {
  Draft = 'Draft', // Before "Apply" is clicked, perhaps? But instructions say on Apply -> pending.
  Pending = 'Pending', // Applied
  Approved = 'Approved', // Sanctioned
  Rejected = 'Rejected', // Rejected by Sanction
  Disbursed = 'Disbursed', // Disbursed
  Closed = 'Closed' // Closed
}

const loanSchema = new mongoose.Schema({
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Step 4 config
  amount: { type: Number, required: true },
  tenure: { type: Number, required: true }, // in days
  interestRate: { type: Number, default: 12 }, // 12% p.a.
  
  totalRepayment: { type: Number, required: true },
  
  status: { type: String, enum: Object.values(LoanStatus), default: LoanStatus.Pending },
  
  rejectionReason: { type: String }, // If rejected
  
}, { timestamps: true });

export const Loan = mongoose.model('Loan', loanSchema);
