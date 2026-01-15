import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardHeader = ({ onAdd }) => (
  <motion.header
    className="border-b border-slate-700/50 py-8 mb-8"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <h1 className="text-5xl font-bold text-slate-50 mb-2">Team Management</h1>
        <p className="text-slate-400 text-lg">Monitor, manage, and maintain your team members</p>
      </motion.div>
      <motion.button
        onClick={onAdd}
        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg flex items-center gap-2 font-medium shadow-lg shadow-emerald-500/20 transition-all duration-200 whitespace-nowrap"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          initial={{ rotate: -180 }}
          animate={{ rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Plus className="w-5 h-5" />
        </motion.div>
        Add Member
      </motion.button>
    </div>
  </motion.header>
);

export default DashboardHeader;
