"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const loanController_1 = require("../controllers/loanController");
const auth_1 = require("../middlewares/auth");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (['image/jpeg', 'image/png', 'application/pdf'].includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type'));
        }
    }
});
router.use(auth_1.authenticate);
router.use((0, auth_1.authorize)([User_1.UserRole.Borrower])); // Only borrowers can use these routes
router.post('/personal-details', loanController_1.savePersonalDetails);
router.post('/salary-slip', upload.single('file'), loanController_1.uploadSalarySlip);
router.post('/apply', loanController_1.applyLoan);
router.get('/my', loanController_1.getMyLoans);
exports.default = router;
//# sourceMappingURL=loan.js.map