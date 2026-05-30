import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  loan: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
  utrNumber: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
}, { timestamps: true });

export const Payment = mongoose.model('Payment', paymentSchema);
