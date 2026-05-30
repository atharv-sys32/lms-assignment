"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const User_1 = require("../models/User");
const dashboardController_1 = require("../controllers/dashboardController");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
// Sales Module
router.get('/sales', (0, auth_1.authorize)([User_1.UserRole.Sales]), dashboardController_1.getSalesLeads);
// Sanction Module
router.get('/sanction', (0, auth_1.authorize)([User_1.UserRole.Sanction]), dashboardController_1.getPendingLoans);
router.put('/sanction/:id', (0, auth_1.authorize)([User_1.UserRole.Sanction]), dashboardController_1.updateSanctionStatus);
// Disbursement Module
router.get('/disbursement', (0, auth_1.authorize)([User_1.UserRole.Disbursement]), dashboardController_1.getApprovedLoans);
router.put('/disbursement/:id', (0, auth_1.authorize)([User_1.UserRole.Disbursement]), dashboardController_1.markDisbursed);
// Collection Module
router.get('/collection', (0, auth_1.authorize)([User_1.UserRole.Collection]), dashboardController_1.getDisbursedLoans);
router.post('/collection/:id/payment', (0, auth_1.authorize)([User_1.UserRole.Collection]), dashboardController_1.recordPayment);
exports.default = router;
//# sourceMappingURL=dashboard.js.map