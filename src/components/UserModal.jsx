import { X } from 'lucide-react';

export default function UserModal({ open, onClose, onSubmit, formData, setFormData, isEdit }) {
  if (!open) return null;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">{isEdit ? 'Edit User' : 'Add User'}</h2>
          <button onClick={onClose}><X /></button>
        </div>

        {['name', 'email', 'role', 'joinDate'].map(field => (
          <input
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field}
            type={field === 'joinDate' ? 'date' : 'text'}
            className="w-full mb-3 p-3 border rounded-lg"
          />
        ))}

        <button
          onClick={onSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          {isEdit ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
}
