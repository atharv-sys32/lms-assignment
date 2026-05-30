# LMS Frontend

This is the frontend for the Loan Management System. It is built with Next.js (App Router), TypeScript, Tailwind CSS, and Zustand for state management.

## Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Copy the example environment file and adjust the API URL if needed:
   ```bash
   cp .env.example .env.local
   ```
   (Make sure `NEXT_PUBLIC_API_URL` points to your backend, usually `http://localhost:5000/api`)

3. **Run Development Server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure

- `/src/app/(auth)`: Login and Registration pages
- `/src/app/apply`: The multi-step Borrower Application flow
- `/src/app/status`: The Borrower's personal loan status page
- `/src/app/dashboard`: The internal Operations Dashboard (for Sales, Sanction, Disbursement, Collection, and Admin roles)
- `/src/store`: Zustand state management (Auth state)
- `/src/lib`: API interceptors (Axios)
