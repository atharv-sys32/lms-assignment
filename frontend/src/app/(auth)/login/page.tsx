'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      setAuth({ email: res.data.email, role: res.data.role, fullName: res.data.fullName }, res.data.token);
      toast.success('Logged in successfully');
      if (res.data.role === 'Borrower') router.push('/status');
      else router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow rounded w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
        <div className="mt-4 text-center text-sm">
          <Link href="/register" className="text-blue-600 hover:underline">Don't have an account? Register</Link>
        </div>
      </form>
    </div>
  );
}
