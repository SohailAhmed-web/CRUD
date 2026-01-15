import { User } from 'lucide-react';

export default function Header({ total }) {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-500">Manage your team members</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
          <User className="w-5 h-5" />
          {total} Users
        </div>
      </div>
    </header>
  );
}
