import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

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

const DeleteConfirmModal = ({ isOpen, userName, onConfirm, onCancel }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          className="fixed inset-0 z-40 bg-black/50"
          variants={OVERLAY_VARIANT}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onCancel}
        />
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={MODAL_VARIANT}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={e => e.stopPropagation()}
        >
          <div className="w-full max-w-sm bg-slate-800 border border-slate-700 rounded-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-xl font-bold text-slate-50">Delete User</h2>
              <motion.button
                onClick={onCancel}
                className="p-1 text-slate-400 hover:text-slate-300 hover:bg-slate-700 rounded-lg transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="text-slate-50 font-medium">Are you sure?</p>
                  <p className="text-slate-400 text-sm">You're about to delete <span className="font-semibold text-slate-300">{userName}</span></p>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-6">This action cannot be undone. The user will be permanently removed from the system.</p>

              <div className="flex gap-3">
                <motion.button
                  onClick={onCancel}
                  className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg font-medium transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={onConfirm}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default DeleteConfirmModal;
