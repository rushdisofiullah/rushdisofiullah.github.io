import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, ShieldAlert, Building2, Scale, Cloud, Brain, Monitor, GitBranch } from 'lucide-react';
import { profile } from '../data/profile';
import { useInView } from '../hooks/useScrollAnimation';

const iconMap: Record<string, React.ElementType> = {
  Target, ShieldAlert, Building2, Scale, Cloud, Brain, Monitor, GitBranch,
};

const barColor: Record<string, string> = {
  teal: 'from-teal to-teal-300',
  coral: 'from-red-400 to-orange-400',
  blue: 'from-blue-400 to-cyan-400',
  violet: 'from-violet-400 to-purple-400',
  amber: 'from-amber to-yellow-400',
};

const borderColor: Record<string, string> = {
  teal: 'border-teal/20 hover:border-teal/40',
  coral: 'border-red-400/20 hover:border-red-400/40',
  blue: 'border-blue-400/20 hover:border-blue-400/40',
  violet: 'border-violet-400/20 hover:border-violet-400/40',
  amber: 'border-amber/20 hover:border-amber/40',
};

const tagColor: Record<string, string> = {
  teal: 'bg-teal/8 text-teal/80 border-teal/15',
  coral: 'bg-red-400/8 text-red-300/80 border-red-400/15',
  blue: 'bg-blue-400/8 text-blue-300/80 border-blue-400/15',
  violet: 'bg-violet-400/8 text-violet-300/80 border-violet-400/15',
  amber: 'bg-amber/8 text-amber/80 border-amber/15',
};

const iconBg: Record<string, string> = {
  teal: 'bg-teal/10 text-teal',
  coral: 'bg-red-400/10 text-red-400',
  blue: 'bg-blue-400/10 text-blue-400',
  violet: 'bg-violet-400/10 text-violet-400',
  amber: 'bg-amber/10 text-amber',
};

function SkillBar({ level, color, inView }: { level: number; color: string; inView: boolean }) {
  return (
    <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r ${barColor[color]}`}
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export default function Expertise() {
  const { ref, inView } = useInView(0.05);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="expertise" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-800/30 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16">
          <p className="font-mono text-xs text-teal tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-teal" /> Capabilities
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Areas of <span className="text-gradient">Expertise</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profile.expertise.map((e, i) => {
            const Icon = iconMap[e.icon] || Target;
            const isActive = active === i;
            return (
              <motion.div key={e.category}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                onClick={() => setActive(isActive ? null : i)}
                className={`rounded-2xl border bg-navy-700/30 p-5 cursor-pointer transition-all duration-300
                  ${borderColor[e.color]} ${isActive ? 'bg-navy-600/50 shadow-card-hover' : 'hover:bg-navy-700/50'}`}>

                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg[e.color]}`}>
                    <Icon size={20} />
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs text-slate-500">{e.level}%</span>
                  </div>
                </div>

                <h3 className="font-semibold text-white text-sm mb-3 leading-snug">{e.category}</h3>

                <SkillBar level={e.level} color={e.color} inView={inView} />

                <motion.div animate={isActive ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                  initial={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                  className="overflow-hidden">
                  <div className="pt-4 flex flex-wrap gap-1.5">
                    {e.skills.map(s => (
                      <span key={s} className={`font-mono text-[9px] px-1.5 py-0.5 rounded border ${tagColor[e.color]}`}>{s}</span>
                    ))}
                  </div>
                </motion.div>

                {!isActive && (
                  <p className="font-mono text-[10px] text-slate-600 mt-3">Click to expand</p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Frameworks grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }} className="mt-16">
          <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-6 flex items-center gap-2">
            Security Frameworks & Standards
            <span className="flex-1 h-px bg-white/5" />
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.frameworks.map((f, i) => (
              <motion.div key={f.name}
                initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.04 }}
                className="group flex items-center gap-2 border border-white/8 bg-navy-700/30 rounded-xl px-4 py-2.5 hover:border-teal/25 hover:bg-teal/5 transition-all duration-200 cursor-default">
                <span className="font-mono text-[10px] text-teal/60 bg-teal/10 px-1.5 py-0.5 rounded">{f.category}</span>
                <span className="font-semibold text-sm text-white group-hover:text-teal transition-colors">{f.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
