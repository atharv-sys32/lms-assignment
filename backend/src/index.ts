import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import { ENV } from './config/env';
import authRoutes from './routes/auth';
import loanRoutes from './routes/loan';
import dashboardRoutes from './routes/dashboard';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // for salary slip

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/loan', loanRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});
