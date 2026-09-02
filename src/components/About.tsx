import { motion } from 'framer-motion';
import { Shield, Target, Users, TrendingUp, Quote } from 'lucide-react';
import { profile } from '../data/profile';
import { useInView } from '../hooks/useScrollAnimation';

const pillars = [
  { icon: Shield, title: 'ISMS & GRC Leadership', desc: 'Governing enterprise information security management systems, risk frameworks, and regulatory compliance programs at board level.', color: 'teal' },
  { icon: Target, title: 'Strategic Planning', desc: 'Translating cyber risk into business language — building multi-year roadmaps that align security investment to organizational objectives.', color: 'blue' },
  { icon: Users, title: 'Leadership & Mentoring', desc: 'Building high-performing cybersecurity teams, defining capability roadmaps, and fostering a security-first culture across the enterprise.', color: 'violet' },
  { icon: TrendingUp, title: 'Enterprise Transformation', desc: 'Driving end-to-end cybersecurity transformation programs across technology, process, and people dimensions at scale.', color: 'amber' },
];

const colorMap: Record<string, string> = {
  teal: 'border-teal/20 bg-teal/5 text-teal',
  blue: 'border-blue-400/20 bg-blue-500/5 text-blue-400',
  violet: 'border-violet-400/20 bg-violet-500/5 text-violet-400',
  amber: 'border-amber/20 bg-amber/5 text-amber',
};
const iconBg: Record<string, string> = {
  teal: 'bg-teal/10 text-teal',
  blue: 'bg-blue-500/10 text-blue-400',
  violet: 'bg-violet-500/10 text-violet-400',
  amber: 'bg-amber/10 text-amber',
};

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-800/20 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>

        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16">
          <p className="font-mono text-xs text-teal tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-teal" /> About
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Profile & <span className="text-gradient">Philosophy</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — text */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}>
            <p className="text-slate-300 text-base leading-relaxed mb-5">
              Cybersecurity leader and enterprise security architect with <strong className="text-white">15+ years</strong> of experience across Telecom and Enterprise IT. Over <strong className="text-white">10+ years</strong> in strategic mid-to-senior leadership roles, driving organization-wide cybersecurity transformation at <strong className="text-teal">Robi Axiata PLC</strong> — one of Bangladesh's leading telecommunications operators.
            </p>
            <p className="text-slate-300 text-base leading-relaxed mb-5">
              My expertise spans Enterprise Cybersecurity Strategy, Cyber Risk Management, Cyber Resilience, Security Architecture, Cloud Security, Zero Trust, DevSecOps, Application Security, Data Privacy, AI Security, and AI Governance — combining strategic vision with hands-on technical depth.
            </p>
            <p className="text-slate-300 text-base leading-relaxed mb-10">
              I provide strategic assurance and cybersecurity risk insights to <strong className="text-white">Board committees</strong> (BRCC, RCMC) and executive management — translating technical complexity into business decisions and actionable risk posture improvements.
            </p>

            {/* Philosophy quote */}
            <div className="relative border border-teal/15 rounded-2xl p-6 bg-teal/3">
              <Quote size={24} className="text-teal/30 absolute top-4 left-4" />
              <p className="text-slate-300 text-sm leading-relaxed italic pl-6">
                {profile.philosophy}
              </p>
            </div>
          </motion.div>

          {/* Right — pillars */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                className={`rounded-xl border p-5 transition-all duration-300 hover:shadow-card-hover group ${colorMap[p.color]}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${iconBg[p.color]}`}>
                  <p.icon size={20} />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{p.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}

            {/* Affiliations */}
            <div className="sm:col-span-2 rounded-xl border border-white/5 bg-navy-700/30 p-5">
              <p className="font-mono text-xs text-slate-500 tracking-wider uppercase mb-3">Industry Affiliations</p>
              <div className="space-y-2">
                {profile.affiliations.map(a => (
                  <div key={a} className="flex items-start gap-2.5 text-xs text-slate-400">
                    <span className="w-1 h-1 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
