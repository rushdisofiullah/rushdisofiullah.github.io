import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award } from 'lucide-react';
import { profile } from '../data/profile';
import { useInView } from '../hooks/useScrollAnimation';

const iconMap: Record<string, React.ElementType> = { GraduationCap, BookOpen, Award };

export default function Education() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="education" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16">
          <p className="font-mono text-xs text-teal tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-teal" /> Academic Background
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Education & <span className="text-gradient">Development</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5 mb-16">
          {profile.education.map((e, i) => {
            const Icon = iconMap[e.icon] || GraduationCap;
            return (
              <motion.div key={e.degree}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="rounded-2xl border border-white/8 bg-navy-700/25 p-6 hover:border-teal/20 hover:shadow-card-hover transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-teal/8 border border-teal/15 flex items-center justify-center mb-5 group-hover:bg-teal/12 transition-colors">
                  <Icon size={22} className="text-teal" />
                </div>
                <p className="font-mono text-[10px] text-teal/60 tracking-widest uppercase mb-2">{e.year}</p>
                <h3 className="font-semibold text-white text-sm mb-1 leading-snug">{e.degree}</h3>
                <p className="text-teal text-xs mb-2">{e.institution}</p>
                <p className="font-mono text-xs text-slate-500">{e.gpa}</p>
                {e.note && (
                  <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] text-teal bg-teal/8 border border-teal/15 px-2.5 py-1 rounded-full">
                    <Award size={10} /> {e.note}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Language */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-2xl border border-white/8 bg-navy-700/20 p-6">
          <p className="font-mono text-[10px] text-slate-500 tracking-widest uppercase mb-4">Language Proficiency</p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="font-semibold text-white">English</div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
                <span className="text-teal font-bold">IELTS 7.5</span>
                <span className="text-slate-600">·</span>
                <span>L-8.0</span>
                <span className="text-slate-600">·</span>
                <span>R-8.0</span>
                <span className="text-slate-600">·</span>
                <span>W-7.0</span>
                <span className="text-slate-600">·</span>
                <span>S-7.5</span>
              </div>
              <span className="font-mono text-[10px] text-teal bg-teal/8 border border-teal/15 px-2 py-0.5 rounded-full">Professional Proficiency</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="font-semibold text-white">Bengali</div>
              <span className="font-mono text-[10px] text-blue-400 bg-blue-400/8 border border-blue-400/15 px-2 py-0.5 rounded-full">Native</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
