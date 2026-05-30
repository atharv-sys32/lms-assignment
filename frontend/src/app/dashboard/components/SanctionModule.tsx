import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

export default function SanctionModule() {
  const [loans, setLoans] = useState<any[]>([]);

  useEffect(() => { fetchLoans(); }, []);

  const fetchLoans = async () => {
    try {
      const res = await api.get('/dashboard/sanction');
      setLoans(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const updateStatus = async (id: string, status: string, reason?: string) => {
    try {
      await api.put(`/dashboard/sanction/${id}`, { status, reason });
      toast.success(`Loan ${status}`);
      fetchLoans();
    } catch (e: any) {
      toast.error(e.response?.data?.error || 'Failed to update');
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Sanction - Applied Loans</h2>
      {loans.length === 0 ? <p>No pending loans.</p> : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Borrower</th>
              <th>Amount</th>
              <th>Tenure</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(loan => (
              <tr key={loan._id} className="border-b">
                <td className="py-2">
                  {loan.borrower?.fullName}<br/>
                  <span className="text-sm text-gray-500">PAN: {loan.borrower?.pan}</span>
                </td>
                <td>₹{loan.amount}</td>
                <td>{loan.tenure} days</td>
                <td className="flex gap-2 py-2">
                  <button onClick={() => updateStatus(loan._id, 'Approved')} className="bg-green-500 text-white px-2 py-1 rounded text-sm">Approve</button>
                  <button onClick={() => {
                    const reason = prompt('Reason for rejection:');
                    if (reason) updateStatus(loan._id, 'Rejected', reason);
                  }} className="bg-red-500 text-white px-2 py-1 rounded text-sm">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
