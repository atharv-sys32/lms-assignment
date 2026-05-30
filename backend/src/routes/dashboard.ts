import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import { UserRole } from '../models/User';
import {
  getSalesLeads,
  getPendingLoans,
  updateSanctionStatus,
  getApprovedLoans,
  markDisbursed,
  getDisbursedLoans,
  recordPayment
} from '../controllers/dashboardController';

const router = Router();

router.use(authenticate);

// Sales Module
router.get('/sales', authorize([UserRole.Sales]), getSalesLeads);

// Sanction Module
router.get('/sanction', authorize([UserRole.Sanction]), getPendingLoans);
router.put('/sanction/:id', authorize([UserRole.Sanction]), updateSanctionStatus);

// Disbursement Module
router.get('/disbursement', authorize([UserRole.Disbursement]), getApprovedLoans);
router.put('/disbursement/:id', authorize([UserRole.Disbursement]), markDisbursed);

// Collection Module
router.get('/collection', authorize([UserRole.Collection]), getDisbursedLoans);
router.post('/collection/:id/payment', authorize([UserRole.Collection]), recordPayment);

export default router;
