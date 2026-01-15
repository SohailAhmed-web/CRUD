import { Search, Plus } from 'lucide-react';

export default function SearchBar({ value, onChange, onAdd }) {
  return (
    <div className="flex justify-between items-center gap-4 mb-6">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-3 border rounded-lg"
        />
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        <Plus size={18} />
        Add User
      </button>
    </div>
  );
}
