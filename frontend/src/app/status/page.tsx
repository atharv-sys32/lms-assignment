'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function BorrowerStatus() {
  const { user, token, logout } = useAuthStore();
  const router = useRouter();
  const [loans, setLoans] = useState<any[]>([]);

  useEffect(() => {
    if (!token) router.push('/login');
    if (user?.role !== 'Borrower') router.push('/dashboard');
    else fetchLoans();
  }, [token, user]);

  const fetchLoans = async () => {
    try {
      const res = await api.get('/loan/my');
      setLoans(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Loans</h1>
          <button onClick={() => { logout(); router.push('/login'); }} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </div>
        
        {loans.length === 0 ? (
          <div className="bg-white p-6 shadow rounded">
            <p>You haven't applied for any loans yet.</p>
            <button onClick={() => router.push('/apply')} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Apply Now</button>
          </div>
        ) : (
          <div className="space-y-4">
            {loans.map(loan => (
              <div key={loan._id} className="bg-white p-6 shadow rounded">
                <p><strong>Amount:</strong> ₹{loan.amount}</p>
                <p><strong>Status:</strong> <span className="font-bold text-blue-600">{loan.status}</span></p>
                <p><strong>Tenure:</strong> {loan.tenure} days</p>
                <p><strong>Total Repayment:</strong> ₹{loan.totalRepayment.toFixed(2)}</p>
                {loan.rejectionReason && <p className="text-red-500"><strong>Reason:</strong> {loan.rejectionReason}</p>}
              </div>
            ))}
            <button onClick={() => router.push('/apply')} className="bg-blue-600 text-white px-4 py-2 rounded mt-4">Apply for another loan</button>
          </div>
        )}
      </div>
    </div>
  );
}
