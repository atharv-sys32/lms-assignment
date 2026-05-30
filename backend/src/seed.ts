import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User, UserRole } from './models/User';

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lms');
  
  const password = await bcrypt.hash('password123', 10);
  
  const roles = [
    { email: 'admin@lms.com', role: UserRole.Admin, fullName: 'Admin User' },
    { email: 'sales@lms.com', role: UserRole.Sales, fullName: 'Sales Exec' },
    { email: 'sanction@lms.com', role: UserRole.Sanction, fullName: 'Sanction Exec' },
    { email: 'disbursement@lms.com', role: UserRole.Disbursement, fullName: 'Disbursement Exec' },
    { email: 'collection@lms.com', role: UserRole.Collection, fullName: 'Collection Exec' },
    { email: 'borrower@lms.com', role: UserRole.Borrower, fullName: 'Borrower User' },
  ];

  for (const r of roles) {
    const existing = await User.findOne({ email: r.email });
    if (!existing) {
      await User.create({ ...r, password });
      console.log(`Created user ${r.email}`);
    } else {
      console.log(`User ${r.email} already exists`);
    }
  }

  console.log('Seeding done.');
  process.exit(0);
};

seed().catch(console.error);
