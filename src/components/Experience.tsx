import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, MapPin, Calendar, Briefcase } from 'lucide-react';
import { profile } from '../data/profile';
import { useInView } from '../hooks/useScrollAnimation';

const tagColors: Record<string, string> = {
  Strategy: 'bg-teal/10 text-teal border-teal/20',
  GRC: 'bg-teal/10 text-teal border-teal/20',
  'Cloud Security': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Zero Trust': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'AI Governance': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  DevSecOps: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  SOC: 'bg-amber/10 text-amber border-amber/20',
  'Risk Management': 'bg-teal/10 text-teal border-teal/20',
  'Network Security': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Assurance: 'bg-teal/10 text-teal border-teal/20',
  Monitoring: 'bg-amber/10 text-amber border-amber/20',
  'IP Network': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Core Network': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  Technology: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  ICT: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  Banking: 'bg-amber/10 text-amber border-amber/20',
};

const dotColor: Record<string, string> = {
  teal: 'bg-teal shadow-[0_0_10px_rgba(0,200,160,0.6)]',
  blue: 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]',
  violet: 'bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.5)]',
  amber: 'bg-amber shadow-[0_0_10px_rgba(245,158,11,0.5)]',
};

export default function Experience() {
  const { ref, inView } = useInView(0.05);
  const [expanded, setExpanded] = useState<number>(0);

  return (
    <section id="experience" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16">
          <p className="font-mono text-xs text-teal tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-teal" /> Career Journey
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-teal/40 via-teal/10 to-transparent hidden sm:block" />

          <div className="space-y-6">
            {profile.experience.map((job, i) => (
              <motion.div key={job.company}
                initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative sm:pl-16">

                {/* Timeline dot */}
                <div className={`absolute left-4 top-6 w-4 h-4 rounded-full hidden sm:block z-10 ${dotColor[job.color as keyof typeof dotColor]}`} />

                {/* Card */}
                <div className={`rounded-2xl border transition-all duration-300 overflow-hidden
                  ${expanded === i ? 'border-teal/25 bg-navy-700/50 shadow-card-hover' : 'border-white/5 bg-navy-700/20 hover:border-white/10'}`}>

                  {/* Header — always visible */}
                  <button onClick={() => setExpanded(expanded === i ? -1 : i)}
                    className="w-full text-left p-6 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-display font-bold text-white text-lg">{job.company}</h3>
                        {job.current && (
                          <span className="font-mono text-[10px] text-teal bg-teal/10 border border-teal/20 px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      {/* Current / latest role shown always */}
                      <p className="text-teal text-sm font-medium mb-2">{job.roles[0].title}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-mono">
                        <span className="flex items-center gap-1.5"><Calendar size={11} />{job.period}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={11} />{job.location}</span>
                        <span className="flex items-center gap-1.5"><Briefcase size={11} />{job.duration}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-slate-500 mt-1">
                      {expanded === i ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>
                  </button>

                  {/* Expanded body */}
                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden">
                        <div className="px-6 pb-6 border-t border-white/5 pt-5">
                          {/* All roles */}
                          {job.roles.length > 1 && (
                            <div className="mb-5">
                              <p className="font-mono text-[10px] text-slate-500 tracking-wider uppercase mb-3">Role Progression</p>
                              <div className="space-y-2">
                                {job.roles.map(r => (
                                  <div key={r.title} className="flex items-start justify-between gap-4 text-sm">
                                    <span className="text-slate-300">{r.title}</span>
                                    <span className="font-mono text-[10px] text-slate-500 whitespace-nowrap mt-0.5">{r.period}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Highlights */}
                          <p className="font-mono text-[10px] text-slate-500 tracking-wider uppercase mb-3">Key Contributions</p>
                          <div className="grid sm:grid-cols-2 gap-2 mb-5">
                            {job.highlights.map(h => (
                              <div key={h} className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                                <span className="text-teal mt-1.5 flex-shrink-0">›</span>
                                {h}
                              </div>
                            ))}
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {job.tags.map(t => (
                              <span key={t} className={`font-mono text-[10px] px-2 py-0.5 rounded border ${tagColors[t] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
