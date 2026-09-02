import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Link2, MapPin } from 'lucide-react';
import { profile } from '../data/profile';

function TypingText({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = texts[idx];
    if (!deleting && displayed === current) {
      timeout.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed === '') {
      setDeleting(false);
      setIdx((idx + 1) % texts.length);
    } else {
      const speed = deleting ? 35 : 65;
      timeout.current = setTimeout(() => {
        setDisplayed(deleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1));
      }, speed);
    }
    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [displayed, deleting, idx, texts]);

  return (
    <span className="text-teal">
      {displayed}<span className="inline-block w-0.5 h-6 bg-teal ml-0.5 animate-blink" />
    </span>
  );
}

function RadarSVG() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00c8a0" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#00c8a0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sweepGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00c8a0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00c8a0" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Grid rings */}
      {[160, 120, 80, 40].map((r, i) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none"
          stroke="rgba(0,200,160,0.12)" strokeWidth="1"
          opacity={1 - i * 0.15} />
      ))}
      <circle cx="200" cy="200" r="160" fill="url(#radarGrad)" />
      {/* Cross lines */}
      <line x1="200" y1="40" x2="200" y2="360" stroke="rgba(0,200,160,0.07)" strokeWidth="1" />
      <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(0,200,160,0.07)" strokeWidth="1" />
      <line x1="87" y1="87" x2="313" y2="313" stroke="rgba(0,200,160,0.05)" strokeWidth="1" />
      <line x1="313" y1="87" x2="87" y2="313" stroke="rgba(0,200,160,0.05)" strokeWidth="1" />
      {/* Sweep */}
      <g style={{ transformOrigin: '200px 200px', animation: 'radar 5s linear infinite' }}>
        <path d="M200,200 L200,40 A160,160 0 0,1 360,200 Z" fill="url(#sweepGrad)" opacity="0.5" />
        <line x1="200" y1="200" x2="200" y2="40" stroke="#00c8a0" strokeWidth="1.5" opacity="0.6" />
      </g>
      {/* Center dot */}
      <circle cx="200" cy="200" r="5" fill="none" stroke="#00c8a0" strokeWidth="1.5" opacity="0.9" />
      <circle cx="200" cy="200" r="2.5" fill="#00c8a0" />
      {/* Threat blips */}
      {[
        { cx: 268, cy: 138, r: 4, c: '#00c8a0', dur: '2.1s' },
        { cx: 145, cy: 252, r: 3, c: '#0074e8', dur: '3.4s' },
        { cx: 290, cy: 240, r: 3, c: '#7b4fff', dur: '1.8s' },
        { cx: 115, cy: 145, r: 2.5, c: '#ff6b35', dur: '2.7s' },
        { cx: 230, cy: 300, r: 2.5, c: '#00c8a0', dur: '4s' },
      ].map((b, i) => (
        <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={b.c}>
          <animate attributeName="opacity" values="0.9;0.2;0.9" dur={b.dur} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Ring decorations */}
      {[8, 24, 40, 56].map((deg, i) => (
        <text key={i} x="205" y="46" fontSize="7" fill="rgba(0,200,160,0.35)"
          fontFamily="JetBrains Mono" textAnchor="middle"
          transform={`rotate(${deg * 10} 200 200)`}>{(deg * 10).toString().padStart(3, '0')}°</text>
      ))}
    </svg>
  );
}

export default function Hero() {
  const scrollDown = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.12, ease: 'easeOut' as const } }),
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-teal/3 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left content */}
          <div>
            <motion.div custom={0} initial="hidden" animate="show" variants={fadeUp}
              className="flex items-center gap-3 mb-6">
              <span className="flex items-center gap-2 font-mono text-xs text-teal bg-teal/10 border border-teal/20 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                Available for strategic engagements
              </span>
            </motion.div>

            <motion.div custom={1} initial="hidden" animate="show" variants={fadeUp}>
              <p className="font-mono text-xs text-slate-500 tracking-widest mb-3 uppercase">Cybersecurity Leader · Enterprise Security Architect</p>
              <h1 className="font-display font-bold leading-[1.04] tracking-tight mb-4">
                <span className="block text-5xl sm:text-6xl lg:text-7xl text-white">
                  {profile.name.split(' ').slice(0, 2).join(' ')}
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl text-gradient mt-1">
                  {profile.name.split(' ').slice(2).join(' ')}
                </span>
              </h1>
            </motion.div>

            <motion.div custom={2} initial="hidden" animate="show" variants={fadeUp}
              className="text-lg sm:text-xl text-slate-400 mb-2 h-8 flex items-center">
              <TypingText texts={profile.titles} />
            </motion.div>

            <motion.p custom={3} initial="hidden" animate="show" variants={fadeUp}
              className="text-slate-400 text-base leading-relaxed mb-8 max-w-xl">
              {profile.tagline}. Trusted advisor to Board committees on cyber risk, resilience, and governance.
            </motion.p>

            {/* Metrics */}
            <motion.div custom={4} initial="hidden" animate="show" variants={fadeUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {profile.metrics.map(m => (
                <div key={m.label} className="bg-navy-700/50 border border-white/5 rounded-xl p-4 hover:border-teal/20 transition-colors">
                  <div className="font-display font-bold text-3xl text-white mb-0.5">
                    <span className="text-gradient">{m.value}</span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium leading-tight">{m.label}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{m.sublabel}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div custom={5} initial="hidden" animate="show" variants={fadeUp}
              className="flex flex-wrap gap-3 mb-10">
              <a href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-navy-950 font-semibold text-sm rounded-lg hover:bg-teal-400 transition-all duration-200 shadow-glow-teal hover:shadow-glow-teal-lg">
                <Mail size={16} /> Get in Touch
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-teal/30 text-teal font-semibold text-sm rounded-lg hover:bg-teal/10 hover:border-teal/50 transition-all duration-200">
                <Link2 size={16} /> LinkedIn Profile
              </a>
            </motion.div>

            {/* Location */}
            <motion.div custom={6} initial="hidden" animate="show" variants={fadeUp}
              className="flex items-center gap-2 text-slate-500 font-mono text-xs">
              <MapPin size={12} className="text-teal/60" />
              {profile.location}
              <span className="mx-2 text-slate-700">·</span>
              <Mail size={12} className="text-teal/60" />
              <a href={`mailto:${profile.email}`} className="hover:text-teal transition-colors">{profile.email}</a>
            </motion.div>
          </div>

          {/* Right: radar */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-center justify-center">
            <div className="relative w-[380px] h-[380px]">
              <div className="absolute inset-0 rounded-full bg-teal/5 border border-teal/10" />
              <RadarSVG />
              {/* Floating tags */}
              {[
                { label: 'NIST CSF 2.0', pos: 'top-2 left-0', delay: 0.8 },
                { label: 'ISO 27001', pos: 'top-10 right-0', delay: 1.0 },
                { label: 'Zero Trust', pos: 'bottom-10 left-0', delay: 1.2 },
                { label: 'AI Security', pos: 'bottom-2 right-0', delay: 1.4 },
              ].map(t => (
                <motion.div key={t.label}
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: t.delay, duration: 0.4 }}
                  className={`absolute ${t.pos} font-mono text-[10px] text-teal bg-navy-700 border border-teal/20 px-2 py-1 rounded-md`}>
                  {t.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <button onClick={scrollDown} aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 hover:text-teal transition-colors group">
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </button>
    </section>
  );
}
