import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { useInView } from '../hooks/useScrollAnimation';

const catBorder: Record<string, string> = {
  teal: 'border-teal/20 text-teal',
  blue: 'border-blue-400/20 text-blue-400',
  coral: 'border-red-400/20 text-red-400',
  amber: 'border-amber/20 text-amber',
  violet: 'border-violet-400/20 text-violet-400',
};

const chipHover: Record<string, string> = {
  teal: 'hover:border-teal/40 hover:text-teal hover:bg-teal/8',
  blue: 'hover:border-blue-400/40 hover:text-blue-300 hover:bg-blue-400/8',
  coral: 'hover:border-red-400/40 hover:text-red-300 hover:bg-red-400/8',
  amber: 'hover:border-amber/40 hover:text-amber hover:bg-amber/8',
  violet: 'hover:border-violet-400/40 hover:text-violet-300 hover:bg-violet-400/8',
};

export default function Tools() {
  const { ref, inView } = useInView(0.05);

  return (
    <section id="tools" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16">
          <p className="font-mono text-xs text-teal tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-teal" /> Technology Stack
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Security Platforms <span className="text-gradient">& Tools</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="space-y-10">
          {profile.tools.map((group, gi) => (
            <motion.div key={group.category}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.08 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`font-mono text-[11px] tracking-widest uppercase border px-2.5 py-1 rounded-full ${catBorder[group.color]}`}>
                  {group.category}
                </span>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, ii) => (
                  <motion.span key={item}
                    initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: gi * 0.08 + ii * 0.04 }}
                    className={`font-mono text-xs text-slate-400 bg-navy-700/40 border border-white/8 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-default ${chipHover[group.color]}`}>
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
