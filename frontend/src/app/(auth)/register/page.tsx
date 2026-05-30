'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, password, fullName });
      toast.success('Registered successfully. Please login.');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleRegister} className="bg-white p-8 shadow rounded w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register as Borrower</h2>
        <input 
          className="w-full border p-2 mb-4 rounded" 
          type="text" 
          placeholder="Full Name" 
          value={fullName} 
          onChange={e => setFullName(e.target.value)} 
          required 
        />
        <input 
          className="w-full border p-2 mb-4 rounded" 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <input 
          className="w-full border p-2 mb-6 rounded" 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
        <div className="mt-4 text-center text-sm">
          <Link href="/login" className="text-blue-600 hover:underline">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
}
