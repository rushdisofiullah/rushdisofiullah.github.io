import { motion } from 'framer-motion';
import { Mail, Link2, MapPin, Send, Shield } from 'lucide-react';
import { profile } from '../data/profile';
import { useInView } from '../hooks/useScrollAnimation';

const reasons = [
  'Enterprise Cybersecurity Strategy & Advisory',
  'Security Architecture & Design Review',
  'GRC Program Development & Governance',
  'Cloud Security Architecture',
  'AI Security & Governance Frameworks',
  'Cyber Risk Assessment & Quantification',
  'ISMS Implementation & ISO 27001 Compliance',
  'Executive Cybersecurity Briefings',
];

export default function Contact() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="contact" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-800/30 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16">
          <p className="font-mono text-xs text-teal tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-teal" /> Connect
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              Open to strategic engagements, advisory roles, speaking opportunities, and executive cybersecurity consultations.
            </p>

            {/* Contact links */}
            <div className="space-y-4 mb-10">
              <a href={`mailto:${profile.email}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/6 bg-navy-700/20 hover:border-teal/25 hover:bg-teal/4 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0 group-hover:bg-teal/15 transition-colors">
                  <Mail size={18} className="text-teal" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-mono mb-0.5">Email</p>
                  <p className="text-white text-sm font-medium">{profile.email}</p>
                </div>
                <Send size={14} className="text-teal/40 ml-auto group-hover:text-teal transition-colors" />
              </a>

              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/6 bg-navy-700/20 hover:border-blue-400/25 hover:bg-blue-400/4 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-blue-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-400/15 transition-colors">
                  <Link2 size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-mono mb-0.5">LinkedIn</p>
                  <p className="text-white text-sm font-medium">linkedin.com/in/rushdisofiullah</p>
                </div>
                <Send size={14} className="text-blue-400/40 ml-auto group-hover:text-blue-400 transition-colors" />
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-white/6 bg-navy-700/20">
                <div className="w-10 h-10 rounded-lg bg-violet-400/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-violet-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-mono mb-0.5">Location</p>
                  <p className="text-white text-sm font-medium">{profile.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — engagement areas */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}>
            <div className="rounded-2xl border border-white/8 bg-navy-700/25 p-7">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center">
                  <Shield size={16} className="text-teal" />
                </div>
                <p className="font-semibold text-white">Engagement Areas</p>
              </div>
              <p className="text-slate-400 text-sm mb-5">Available for strategic consulting and advisory engagements in:</p>
              <div className="grid grid-cols-1 gap-2.5">
                {reasons.map((r, i) => (
                  <motion.div key={r}
                    initial={{ opacity: 0, x: 10 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
                    className="flex items-center gap-2.5 text-sm text-slate-400">
                    <span className="w-1 h-1 rounded-full bg-teal flex-shrink-0" />
                    {r}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
