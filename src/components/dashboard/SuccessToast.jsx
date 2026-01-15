import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessToast = ({ message = 'Operation completed successfully' }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed top-4 right-4 z-50"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="bg-slate-800 border border-green-500/40 rounded-lg shadow-2xl p-4 flex items-center gap-4 backdrop-blur">
            <motion.div
              className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 border border-green-500/30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4, type: 'spring' }}
            >
              <motion.span
                initial={{ rotate: -180 }}
                animate={{ rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Check className="w-6 h-6 text-green-400" />
              </motion.span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <p className="font-semibold text-slate-50">Success!</p>
              <p className="text-sm text-slate-400">{message}</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessToast;
