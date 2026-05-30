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
    <div className="bg-white p-6 shadow rounded overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Sanction - Pending Applications</h2>
      {loans.length === 0 ? <p>No pending loans.</p> : (
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="border-b">
              <th className="py-2">Borrower</th>
              <th>Profile</th>
              <th>Loan Details</th>
              <th>Documents</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(loan => (
              <tr key={loan._id} className="border-b">
                <td className="py-4 align-top">
                  <strong>{loan.borrower?.fullName}</strong><br/>
                  <span className="text-sm text-gray-500">{loan.borrower?.email}</span>
                </td>
                <td className="py-4 align-top text-sm">
                  <p><strong>PAN:</strong> {loan.borrower?.pan}</p>
                  <p><strong>Salary:</strong> ₹{loan.borrower?.monthlySalary}</p>
                  <p><strong>Type:</strong> {loan.borrower?.employmentMode}</p>
                </td>
                <td className="py-4 align-top text-sm">
                  <p><strong>Amount:</strong> ₹{loan.amount}</p>
                  <p><strong>Tenure:</strong> {loan.tenure} days</p>
                  <p><strong>Total Repay:</strong> ₹{loan.totalRepayment.toFixed(2)}</p>
                </td>
                <td className="py-4 align-top text-sm">
                  {loan.borrower?.salarySlipUrl ? (
                    <a 
                      href={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/${loan.borrower.salarySlipUrl}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Salary Slip
                    </a>
                  ) : 'No Document'}
                </td>
                <td className="py-4 align-top">
                  <div className="flex flex-col gap-2">
                    <button onClick={() => updateStatus(loan._id, 'Approved')} className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">Approve</button>
                    <button onClick={() => {
                      const reason = prompt('Reason for rejection:');
                      if (reason) updateStatus(loan._id, 'Rejected', reason);
                    }} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
