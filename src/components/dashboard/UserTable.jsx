import { Edit2, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tableRowVariant } from '../../animations/tableVariants';

const StatusBadge = ({ status }) => {
  const isActive = status === 'active';
  return (
    <motion.div
      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium w-fit ${
        isActive 
          ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
          : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {isActive ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      <span>{status}</span>
    </motion.div>
  );
};

const ActionButton = ({ icon: Icon, onClick, color = 'blue', title }) => (
  <motion.button
    onClick={onClick}
    title={title}
    className={`p-2 rounded-lg transition-all duration-200 ${color === 'blue' ? 'text-blue-400 hover:bg-blue-500/20' : 'text-red-400 hover:bg-red-500/20'}`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon size={18} />
  </motion.button>
);

const UserRow = ({ user, onEdit, onDelete, index }) => (
  <motion.tr
    className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors duration-150"
    variants={tableRowVariant(index)}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <td className="px-6 py-4 text-slate-50 font-medium">{user.name}</td>
    <td className="px-6 py-4 text-slate-400">{user.email}</td>
    <td className="px-6 py-4 text-slate-400">{user.role}</td>
    <td className="px-6 py-4">
      <StatusBadge status={user.status} />
    </td>
    <td className="px-6 py-4 text-right">
      <div className="flex items-center justify-end gap-3">
        <ActionButton icon={Edit2} onClick={() => onEdit(user)} color="blue" title="Edit user" />
        <ActionButton icon={Trash2} onClick={() => onDelete(user.id)} color="red" title="Delete user" />
      </div>
    </td>
  </motion.tr>
);

const EmptyState = () => (
  <motion.tr
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-lg font-medium">No users found</p>
        <p className="text-sm mt-2">Try adjusting your search or filters</p>
      </motion.div>
    </td>
  </motion.tr>
);

const TABLE_HEADERS = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions', align: 'right' },
];

const UserTable = ({ users, onEdit, onDelete }) => (
  <motion.div
    className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg overflow-hidden shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <table className="w-full">
      <thead className="bg-slate-900/80 border-b border-slate-700">
        <tr>
          {TABLE_HEADERS.map(header => (
            <th
              key={header.key}
              className={`px-6 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wide ${header.align === 'right' ? 'text-right' : 'text-left'}`}
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <AnimatePresence mode="wait">
          {users.length > 0 ? (
            users.map((user, idx) => (
              <UserRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
                index={idx}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </AnimatePresence>
      </tbody>
    </table>
  </motion.div>
);

export default UserTable;
