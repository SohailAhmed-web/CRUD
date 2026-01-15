import { Edit2, Trash2 } from 'lucide-react';

export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Role</th>
            <th className="px-6 py-4 text-left">Join Date</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">{user.joinDate}</td>
              <td className="px-6 py-4 text-right space-x-2">
                <button onClick={() => onEdit(user)} className="text-blue-600">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => onDelete(user.id)} className="text-red-600">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <p className="text-center py-10 text-slate-400">No users found</p>
      )}
    </div>
  );
}
