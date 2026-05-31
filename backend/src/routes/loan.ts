import { Router } from 'express';
import multer from 'multer';
import { savePersonalDetails, uploadSalarySlip, applyLoan, getMyLoans } from '../controllers/loanController';
import { authenticate, authorize } from '../middlewares/auth';
import { UserRole } from '../models/User';
import fs from 'fs';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ 
  storage, 
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (['image/jpeg', 'image/png', 'application/pdf'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

router.use(authenticate);
router.use(authorize([UserRole.Borrower])); // Only borrowers can use these routes

router.post('/personal-details', savePersonalDetails);
router.post('/salary-slip', upload.single('file'), uploadSalarySlip);
router.post('/apply', applyLoan);
router.get('/my', getMyLoans);

export default router;
