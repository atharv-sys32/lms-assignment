import mongoose from 'mongoose';

export enum UserRole {
  Admin = 'Admin',
  Sales = 'Sales',
  Sanction = 'Sanction',
  Disbursement = 'Disbursement',
  Collection = 'Collection',
  Borrower = 'Borrower',
}

const userSchema = new mongoose.Schema({
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

export const User = mongoose.model('User', userSchema);
