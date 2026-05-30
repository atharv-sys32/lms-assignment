import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

export default function DisbursementModule() {
  const [loans, setLoans] = useState<any[]>([]);

  useEffect(() => { fetchLoans(); }, []);

  const fetchLoans = async () => {
    try {
      const res = await api.get('/dashboard/disbursement');
      setLoans(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const markDisbursed = async (id: string) => {
    try {
      await api.put(`/dashboard/disbursement/${id}`);
      toast.success(`Loan Disbursed`);
      fetchLoans();
    } catch (e: any) {
      toast.error(e.response?.data?.error || 'Failed to disburse');
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Disbursement - Approved Loans</h2>
      {loans.length === 0 ? <p>No approved loans pending disbursement.</p> : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Borrower</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(loan => (
              <tr key={loan._id} className="border-b">
                <td className="py-2">{loan.borrower?.fullName}</td>
                <td>₹{loan.amount}</td>
                <td>
                  <button onClick={() => markDisbursed(loan._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Mark Disbursed</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
