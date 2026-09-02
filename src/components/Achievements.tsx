import { motion } from 'framer-motion';
import { Award, Zap, Shield, Lock, Trophy, TrendingUp, Star, RefreshCw } from 'lucide-react';
import { profile } from '../data/profile';
import { useInView } from '../hooks/useScrollAnimation';

const iconMap: Record<string, React.ElementType> = {
  Award, Zap, Shield, Lock, Trophy, TrendingUp, Star, RefreshCw,
};

const cardStyles: Record<string, { border: string; glow: string; iconBg: string; iconColor: string; yearColor: string }> = {
  teal:   { border: 'border-teal/20 hover:border-teal/40',         glow: 'hover:shadow-glow-teal',       iconBg: 'bg-teal/10',         iconColor: 'text-teal',        yearColor: 'text-teal' },
  blue:   { border: 'border-blue-400/20 hover:border-blue-400/40', glow: 'hover:shadow-glow-blue',       iconBg: 'bg-blue-400/10',     iconColor: 'text-blue-400',    yearColor: 'text-blue-400' },
  violet: { border: 'border-violet-400/20 hover:border-violet-400/40', glow: 'hover:shadow-card-hover',  iconBg: 'bg-violet-400/10',   iconColor: 'text-violet-400',  yearColor: 'text-violet-400' },
  coral:  { border: 'border-red-400/20 hover:border-red-400/40',   glow: 'hover:shadow-card-hover',      iconBg: 'bg-red-400/10',      iconColor: 'text-red-400',     yearColor: 'text-red-400' },
  amber:  { border: 'border-amber/20 hover:border-amber/40',       glow: 'hover:shadow-card-hover',      iconBg: 'bg-amber/10',        iconColor: 'text-amber',       yearColor: 'text-amber' },
};

export default function Achievements() {
  const { ref, inView } = useInView(0.05);

  return (
    <section id="achievements" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-800/30 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16">
          <p className="font-mono text-xs text-teal tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-teal" /> Impact
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Selected <span className="text-gradient">Achievements</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profile.achievements.map((a, i) => {
            const Icon = iconMap[a.icon] || Award;
            const s = cardStyles[a.color] || cardStyles.teal;
            return (
              <motion.div key={a.title}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative rounded-2xl border bg-navy-700/30 p-5 transition-all duration-300 group ${s.border} ${s.glow}`}>
                {/* Year badge */}
                <div className={`font-mono text-[10px] font-bold tracking-widest mb-4 ${s.yearColor}`}>
                  {a.year}
                </div>
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.iconBg}`}>
                  <Icon size={20} className={s.iconColor} />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2 leading-snug">{a.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{a.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }} className="mt-20">
          <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-6 flex items-center gap-2">
            Certifications & Professional Development
            <span className="flex-1 h-px bg-white/5" />
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {profile.certifications.map((c, i) => (
              <motion.div key={c.name}
                initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.65 + i * 0.05 }}
                className="flex items-center justify-between border border-white/6 bg-navy-700/20 rounded-xl px-4 py-3 hover:border-white/12 transition-all group">
                <div>
                  <p className="text-white text-sm font-medium">{c.name}</p>
                  <p className="text-slate-500 text-xs font-mono mt-0.5">{c.issuer}</p>
                </div>
                <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 ml-3
                  ${c.status === 'certified' ? 'text-teal border-teal/25 bg-teal/8' : 'text-slate-500 border-white/10 bg-white/3'}`}>
                  {c.status === 'certified' ? 'Certified' : 'Training'}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
