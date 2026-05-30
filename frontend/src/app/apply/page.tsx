'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ApplyLoan() {
  const [step, setStep] = useState(2); // Step 1 is auth
  const { user, token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push('/login');
    if (user?.role !== 'Borrower') router.push('/dashboard');
    else {
      // Fetch user profile to prefill data if they already have it
      api.get('/auth/me').then(res => {
        if (res.data.pan) setPan(res.data.pan);
        if (res.data.dob) setDob(new Date(res.data.dob).toISOString().split('T')[0]);
        if (res.data.monthlySalary) setMonthlySalary(res.data.monthlySalary.toString());
        if (res.data.employmentMode) setEmploymentMode(res.data.employmentMode);
      }).catch(err => console.error(err));
    }
  }, [token, user, router]);

  // Step 2 Form
  const [loading, setLoading] = useState(false);
  const [pan, setPan] = useState('');
  const [dob, setDob] = useState('');
  const [monthlySalary, setMonthlySalary] = useState('');
  const [employmentMode, setEmploymentMode] = useState('Salaried');

  // Step 3 Form
  const [file, setFile] = useState<File | null>(null);

  // Step 4 Form
  const [amount, setAmount] = useState<number>(50000);
  const [tenure, setTenure] = useState<number>(30); // days

  // Derived for Step 4
  const interestRate = 12;
  const si = (amount * interestRate * tenure) / (365 * 100);
  const totalRepayment = amount + si;

  const submitStep2 = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      await api.post('/loan/personal-details', { 
        pan, dob, monthlySalary: Number(monthlySalary), employmentMode 
      });
      toast.success('Eligibility check passed!');
      setStep(3);
    } catch (error: any) {
      toast.error(error.response?.data?.details?.join(', ') || error.response?.data?.error || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const submitStep3 = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!file) return toast.error('Please select a file');
    const formData = new FormData();
    formData.append('file', file);
    try {
      await api.post('/loan/salary-slip', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Salary slip uploaded!');
      setStep(4);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to upload');
    } finally {
      setLoading(false);
    }
  };

  const submitStep4 = async () => {
    setLoading(true);
    try {
      await api.post('/loan/apply', { amount, tenure });
      toast.success('Loan Applied Successfully!');
      router.push('/status');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to apply');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto bg-white shadow rounded p-8">
        {step === 2 && (
          <form onSubmit={submitStep2}>
            <h2 className="text-2xl font-bold mb-6">Step 2: Personal Details</h2>
            <div className="mb-4">
              <label className="block mb-1">PAN Card</label>
              <input type="text" className="w-full border p-2 rounded uppercase" value={pan} onChange={e => setPan(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Date of Birth</label>
              <input type="date" className="w-full border p-2 rounded" value={dob} onChange={e => setDob(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Monthly Salary (₹)</label>
              <input type="number" className="w-full border p-2 rounded" value={monthlySalary} onChange={e => setMonthlySalary(e.target.value)} required />
            </div>
            <div className="mb-6">
              <label className="block mb-1">Employment Mode</label>
              <select className="w-full border p-2 rounded" value={employmentMode} onChange={e => setEmploymentMode(e.target.value)}>
                <option value="Salaried">Salaried</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>
            <button disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded disabled:bg-blue-400">{loading ? "Checking..." : "Check Eligibility & Next"}</button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={submitStep3}>
            <h2 className="text-2xl font-bold mb-6">Step 3: Upload Salary Slip</h2>
            <input type="file" className="mb-6 w-full" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setFile(e.target.files?.[0] || null)} required />
            <button disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded disabled:bg-blue-400">{loading ? "Uploading..." : "Upload & Next"}</button>
          </form>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Step 4: Loan Configuration</h2>
            
            <div className="mb-6">
              <label className="block mb-1 font-semibold">Loan Amount: ₹{amount.toLocaleString()}</label>
              <input type="range" min="50000" max="500000" step="10000" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full" />
            </div>
            
            <div className="mb-6">
              <label className="block mb-1 font-semibold">Tenure: {tenure} days</label>
              <input type="range" min="30" max="365" step="1" value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-full" />
            </div>

            <div className="bg-gray-100 p-4 rounded mb-6">
              <p>Interest Rate: <strong>12% p.a.</strong></p>
              <p>Simple Interest: <strong>₹{si.toFixed(2)}</strong></p>
              <p className="text-xl mt-2">Total Repayment: <strong>₹{totalRepayment.toFixed(2)}</strong></p>
            </div>

            <button onClick={submitStep4} disabled={loading} className="w-full bg-green-600 text-white p-3 rounded font-bold disabled:bg-green-400">{loading ? "Applying..." : "Apply Now"}</button>
          </div>
        )}
      </div>
    </div>
  );
}
