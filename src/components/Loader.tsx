import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-navy-900 flex flex-col items-center justify-center gap-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative">
        <div className="w-20 h-20 rounded-2xl bg-teal/10 border border-teal/25 flex items-center justify-center animate-pulse-glow">
          <Shield size={36} className="text-teal" />
        </div>
        <div className="absolute inset-0 rounded-2xl border border-teal/20 animate-ping opacity-30" />
      </motion.div>

      <div className="flex flex-col items-center gap-2">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="font-display font-bold text-white text-lg">Sofi Ullah</motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="font-mono text-[11px] text-teal tracking-widest uppercase">Initializing Portfolio</motion.p>
      </div>

      <motion.div initial={{ width: 0 }} animate={{ width: 160 }} transition={{ delay: 0.4, duration: 0.8 }}
        className="h-0.5 bg-gradient-to-r from-transparent via-teal to-transparent" />
    </motion.div>
  );
}
