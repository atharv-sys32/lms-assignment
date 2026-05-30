# LMS Backend

This is the backend for the Loan Management System. It is built with Node.js, Express, TypeScript, and MongoDB (Mongoose).

## Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   Update the `MONGO_URI` in the `.env` file to point to your local or cloud MongoDB instance.

3. **Build the TypeScript Code:**
   ```bash
   npm run build
   ```

4. **Seed the Database:**
   To test the application easily, run the seed script to create test accounts for all roles (Admin, Sales, Sanction, Disbursement, Collection, Borrower).
   ```bash
   npm run seed
   ```

5. **Start Development Server:**
   ```bash
   npm run dev
   ```
   (Or use `npm start` to run the compiled output in `dist/`).

## Architecture

- **Auth**: JWT-based authentication. Passwords hashed via `bcrypt`.
- **RBAC Middleware**: Middleware to restrict dashboard APIs to specific roles.
- **Business Rule Engine (BRE)**: Eligibility validation logic in `/src/utils/bre.ts` (checks age, salary, employment mode, and PAN format).
- **Controllers/Routes**: Separated domains for Auth, Loan Applications, and Operations Dashboard.
- **File Upload**: Uses `multer` to store salary slip uploads.
