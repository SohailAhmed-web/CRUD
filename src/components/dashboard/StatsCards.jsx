import { Users, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { cardVariant } from '../../animations/cardVariants';

const COLOR_MAP = {
  blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  green: 'bg-green-500/10 text-green-400 border border-green-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  red: 'bg-red-500/10 text-red-400 border border-red-500/20',
};

const StatCard = ({ label, value, icon: Icon, color = 'blue', index = 0 }) => (
  <motion.div
    className="bg-slate-800/50 backdrop-blur border border-slate-700 p-6 rounded-lg hover:border-slate-600 transition-all duration-200 shadow-lg"
    variants={cardVariant(index)}
    initial="hidden"
    animate="visible"
    whileHover="hover"
  >
    <div className="flex justify-between items-start gap-4">
      <div>
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">{label}</p>
        <motion.p className="text-4xl font-bold text-slate-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {value}
        </motion.p>
      </div>
      <motion.div className={`p-3 rounded-lg ${COLOR_MAP[color]}`} whileHover={{ scale: 1.15 }}>
        <Icon className="w-6 h-6" />
      </motion.div>
    </div>
  </motion.div>
);

const StatsCards = ({ users }) => {
  const activeCount = users.filter(u => u.status === 'active').length;
  const inactiveCount = users.filter(u => u.status === 'inactive').length;

  const stats = [
    { label: 'Total Users', value: users.length, icon: Users, color: 'blue' },
    { label: 'Active Users', value: activeCount, icon: CheckCircle, color: 'green' },
    { label: 'Inactive Users', value: inactiveCount, icon: AlertCircle, color: 'orange' },
    { label: 'Growth Rate', value: '+12%', icon: TrendingUp, color: 'blue' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <StatCard key={stat.label} {...stat} index={idx} />
      ))}
    </div>
  );
};

export default StatsCards;
