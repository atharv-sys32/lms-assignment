'use client';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import SalesModule from './components/SalesModule';
import SanctionModule from './components/SanctionModule';
import DisbursementModule from './components/DisbursementModule';
import CollectionModule from './components/CollectionModule';

export default function Dashboard() {
  const { user, token, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push('/login');
    if (user?.role === 'Borrower') router.push('/status');
  }, [token, user]);

  if (!user || user.role === 'Borrower') return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">LMS Operations Dashboard ({user.role})</h1>
        <div className="flex items-center gap-4">
          <span>{user.fullName}</span>
          <button onClick={() => { logout(); router.push('/login'); }} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
        </div>
      </header>

      <main className="p-8 max-w-6xl mx-auto space-y-8">
        {(user.role === 'Admin' || user.role === 'Sales') && <SalesModule />}
        {(user.role === 'Admin' || user.role === 'Sanction') && <SanctionModule />}
        {(user.role === 'Admin' || user.role === 'Disbursement') && <DisbursementModule />}
        {(user.role === 'Admin' || user.role === 'Collection') && <CollectionModule />}
      </main>
    </div>
  );
}
