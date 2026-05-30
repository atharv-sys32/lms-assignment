import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

export default function CollectionModule() {
  const [loans, setLoans] = useState<any[]>([]);
  const [paymentData, setPaymentData] = useState<{utrNumber: string, amount: string, date: string, loanId: string | null}>({
    utrNumber: '', amount: '', date: '', loanId: null
  });

  useEffect(() => { fetchLoans(); }, []);

  const fetchLoans = async () => {
    try {
      const res = await api.get('/dashboard/collection');
      setLoans(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const recordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentData.loanId) return;
    try {
      const res = await api.post(`/dashboard/collection/${paymentData.loanId}/payment`, {
        utrNumber: paymentData.utrNumber,
        amount: Number(paymentData.amount),
        date: paymentData.date
      });
      toast.success(res.data.message || 'Payment recorded');
      setPaymentData({ utrNumber: '', amount: '', date: '', loanId: null });
      fetchLoans(); // Refresh to see if loan is closed
    } catch (e: any) {
      toast.error(e.response?.data?.error || 'Failed to record payment');
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Collection - Disbursed Loans</h2>
      {loans.length === 0 ? <p>No active loans.</p> : (
        <div className="space-y-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Borrower</th>
                <th>Remaining Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map(loan => (
                <tr key={loan._id} className="border-b">
                  <td className="py-2">{loan.borrower?.fullName}</td>
                  <td>\n                    <p>Total: ₹{loan.totalRepayment.toFixed(2)}</p>\n                    <p className="font-bold text-red-600">Left: ₹{loan.outstandingBalance?.toFixed(2)}</p>\n                  </td>
                  <td>
                    <button 
                      onClick={() => setPaymentData({ ...paymentData, loanId: loan._id })}
                      className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Add Payment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {paymentData.loanId && (
            <form onSubmit={recordPayment} className="mt-4 p-4 border rounded bg-gray-50">
              <h3 className="font-bold mb-2">Record Payment</h3>
              <div className="grid grid-cols-3 gap-4">
                <input type="text" placeholder="UTR Number" className="border p-2 rounded" value={paymentData.utrNumber} onChange={e => setPaymentData({...paymentData, utrNumber: e.target.value})} required />
                <input type="number" placeholder="Amount" className="border p-2 rounded" value={paymentData.amount} onChange={e => setPaymentData({...paymentData, amount: e.target.value})} required />
                <input type="date" className="border p-2 rounded" value={paymentData.date} onChange={e => setPaymentData({...paymentData, date: e.target.value})} required />
              </div>
              <div className="mt-4 flex gap-2">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit Payment</button>
                <button type="button" onClick={() => setPaymentData({...paymentData, loanId: null})} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
