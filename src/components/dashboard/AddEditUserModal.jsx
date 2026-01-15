import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import { ROLES } from '../../hooks/useCRUD';

const MODAL_VARIANT = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const OVERLAY_VARIANT = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const FORM_FIELDS = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'role', label: 'Role', type: 'select', options: ROLES, required: true },
  { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive'], required: true },
];

const FormField = ({ label, type, name, value, onChange, error, options }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
    {type === 'select' ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
      />
    )}
    {error && (
      <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
        <AlertCircle className="w-4 h-4" />
        {error}
      </div>
    )}
  </div>
);

const AddEditUserModal = ({ isOpen, user, onSave, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', role: '', status: 'active' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
    } else {
      setFormData({ name: '', email: '', role: '', status: 'active' });
    }
    setErrors({});
  }, [user, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.role) newErrors.role = 'Role is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            variants={OVERLAY_VARIANT}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={MODAL_VARIANT}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b border-slate-700">
                <h2 className="text-2xl font-bold text-slate-50">{user ? 'Edit User' : 'Add New User'}</h2>
                <motion.button
                  onClick={onClose}
                  className="p-1 text-slate-400 hover:text-slate-300 hover:bg-slate-700 rounded-lg transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                {FORM_FIELDS.map(field => (
                  <FormField
                    key={field.name}
                    {...field}
                    value={formData[field.name]}
                    onChange={handleChange}
                    error={errors[field.name]}
                  />
                ))}

                <div className="flex gap-3 mt-6">
                  <motion.button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {user ? 'Update' : 'Create'}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddEditUserModal;
