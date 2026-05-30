import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function SalesModule() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => { fetchLeads(); }, []);

  const fetchLeads = async () => {
    try {
      const res = await api.get('/dashboard/sales');
      setLeads(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Sales - Pre-Application Leads</h2>
      {leads.length === 0 ? <p>No leads found.</p> : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Registered At</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead._id} className="border-b">
                <td className="py-2">{lead.fullName || 'N/A'}</td>
                <td>{lead.email}</td>
                <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
