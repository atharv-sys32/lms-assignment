# 🏦 Loan Management System (LMS)

![Tech Stack](https://img.shields.io/badge/Tech_Stack-MERN_%7C_Next.js_%7C_TypeScript-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

A full-stack, comprehensive Loan Management System designed to handle end-to-end loan lifecycles. It features a multi-step **Borrower Portal** for loan applications and an **Operations Dashboard** with Role-Based Access Control (RBAC) for internal executives to manage applications through Sales, Sanction, Disbursement, and Collection stages.

---

## ✨ Key Features

### 🧑‍💼 Borrower Journey
1. **Authentication**: Secure sign-up and login using JWT & bcrypt.
2. **Business Rule Engine (BRE)**: Server-side evaluation to automatically reject unqualified applicants based on:
   - Age (must be 23-50)
   - Monthly Salary (must be ≥ ₹25,000)
   - Employment Mode (rejects Unemployed)
   - PAN Card Format Validation
3. **Document Upload**: Secure file upload for salary slips (PDF/JPG/PNG up to 5MB).
4. **Loan Configuration**: Dynamic slider interface to select loan amount (₹50k - ₹5L) and tenure (30-365 days) with real-time Simple Interest (12% p.a.) calculation.

### 🏢 Operations Dashboard (RBAC Enforced)
Secure API endpoints and frontend routing strictly isolate data access based on user roles:
- **Sales Executive**: Views pre-application leads (registered but haven't applied).
- **Sanction Executive**: Reviews pending loans to strictly approve or reject (with reasons).
- **Disbursement Executive**: Marks approved loans as funds disbursed.
- **Collection Executive**: Records active loan payments. Verifies unique UTRs and automatically closes the loan when total repayment is met.
- **Admin**: Has overarching access to all dashboard modules.

---

## 🛠 Tech Stack

| Domain | Technology |
|---|---|
| **Frontend** | Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Zustand |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB, Mongoose |
| **Security/Auth** | JSON Web Tokens (JWT), bcrypt |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local instance or MongoDB Atlas)

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env and set your MongoDB URI and JWT Secret

# Build TypeScript code
npm run build

# Seed database with test roles (Admin, Sales, Borrower, etc.)
npm run seed

# Start development server
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Login Credentials

The `npm run seed` command automatically provisions the following test accounts. The password for **all** accounts is `password123`.

| Role | Email | Module Access |
|---|---|---|
| **Admin** | `admin@lms.com` | All Modules |
| **Sales** | `sales@lms.com` | Sales (Leads) |
| **Sanction** | `sanction@lms.com` | Sanction (Pending Loans) |
| **Disbursement** | `disbursement@lms.com` | Disbursement (Approved Loans) |
| **Collection** | `collection@lms.com` | Collection (Active Payments) |
| **Borrower** | `borrower@lms.com` | Borrower Application Portal |

---

## 📂 Project Architecture

```
lms-assignment/
├── backend/
│   ├── src/
│   │   ├── config/       # Environment & Database config
│   │   ├── controllers/  # API Business Logic
│   │   ├── middlewares/  # JWT Auth & RBAC checks
│   │   ├── models/       # Mongoose Schemas
│   │   ├── routes/       # Express Route definitions
│   │   ├── utils/        # BRE Logic & Helpers
│   │   ├── index.ts      # Server Entry Point
│   │   └── seed.ts       # Database Seeder
│   └── uploads/          # Local storage for Salary Slips
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── (auth)/   # Login & Register views
    │   │   ├── apply/    # Borrower Multi-step Application
    │   │   ├── dashboard/# Operations RBAC Dashboard
    │   │   └── status/   # Borrower Loan Status view
    │   ├── lib/          # Axios Interceptors
    │   └── store/        # Zustand Auth State
```

---

## 🛡 Design Decisions & Edge Cases Handled
1. **BRE Location**: Placed firmly on the server-side (`backend/src/utils/bre.ts`) to prevent client-side bypass.
2. **PAN Regex**: Used `/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/` for accurate Indian PAN card validation.
3. **Payment Integrity**: The Collection API checks the database for UTR uniqueness prior to saving a payment, and mathematically checks `totalPaid >= totalRepayment` to trigger a state machine transition to `Closed`.
