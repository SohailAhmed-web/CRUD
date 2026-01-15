import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FILTER_OPTIONS = ['all', 'active', 'inactive'];

const SearchFilterBar = ({ searchTerm, onSearchChange, selectedFilter, onFilterChange }) => (
  <motion.div
    className="flex flex-col lg:flex-row gap-4 mb-8"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative flex-1 lg:flex-initial lg:w-80">
      <Search className="absolute left-4 top-3 text-slate-500 w-5 h-5 pointer-events-none" />
      <motion.input
        className="w-full pl-12 pr-10 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
        placeholder="Search by name, email, or role..."
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      />
      <AnimatePresence>
        {searchTerm && (
          <motion.button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition-colors p-1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>

    <motion.div
      className="flex gap-2 flex-wrap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {FILTER_OPTIONS.map((f, idx) => (
        <motion.button
          key={f}
          onClick={() => onFilterChange(f)}
          className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm uppercase tracking-wide ${
            selectedFilter === f
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600 hover:bg-slate-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + idx * 0.05 }}
        >
          {f}
        </motion.button>
      ))}
    </motion.div>
  </motion.div>
);

export default SearchFilterBar;
