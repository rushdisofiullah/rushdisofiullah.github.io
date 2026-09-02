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
  // Blips placed on outer rings r=120-155 = "high value" zone near the perimeter
  const blips = [
    { angle: 38,  r: 148, size: 4.5, color: '#00c8a0', cls: 'bp1', ring: true  },
    { angle: 112, r: 138, size: 3.5, color: '#0074e8', cls: 'bp2', ring: true  },
    { angle: 195, r: 152, size: 4.0, color: '#7b4fff', cls: 'bp3', ring: true  },
    { angle: 260, r: 142, size: 3.0, color: '#ff6b35', cls: 'bp4', ring: false },
    { angle: 315, r: 150, size: 3.5, color: '#00c8a0', cls: 'bp5', ring: true  },
    { angle: 70,  r: 125, size: 3.0, color: '#7b4fff', cls: 'bp6', ring: false },
    { angle: 160, r: 132, size: 2.5, color: '#0074e8', cls: 'bp7', ring: false },
  ];

  // Polar to cartesian: 0deg = top, clockwise
  const polar = (angleDeg: number, radius: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: 200 + radius * Math.cos(rad), y: 200 + radius * Math.sin(rad) };
  };

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* ── Inject keyframes directly — guaranteed to work in React ── */}
        <style>{`
          @keyframes radarSweepCW {
            from { transform: rotate(0deg);   }
            to   { transform: rotate(360deg); }
          }
          .radar-arm {
            transform-origin: 200px 200px;
            animation: radarSweepCW 5s linear infinite;
          }
          .bp1 { animation: radarBlink 2.1s ease-in-out infinite; }
          .bp2 { animation: radarBlink 3.4s ease-in-out infinite 0.6s; }
          .bp3 { animation: radarBlink 1.8s ease-in-out infinite 1.1s; }
          .bp4 { animation: radarBlink 2.7s ease-in-out infinite 0.3s; }
          .bp5 { animation: radarBlink 4.0s ease-in-out infinite 0.9s; }
          .bp6 { animation: radarBlink 3.0s ease-in-out infinite 1.5s; }
          .bp7 { animation: radarBlink 2.5s ease-in-out infinite 0.7s; }
          @keyframes radarBlink {
            0%,100% { opacity: 0.95; }
            50%      { opacity: 0.18; }
          }
        `}</style>

        <radialGradient id="rg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#00c8a0" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#00c8a0" stopOpacity="0"    />
        </radialGradient>

        {/* Sweep fan: bright at center edge, fading outward AND angularly */}
        <linearGradient id="sweepFan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#00c8a0" stopOpacity="0.0"  />
          <stop offset="40%"  stopColor="#00c8a0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00c8a0" stopOpacity="0.0"  />
        </linearGradient>

        <radialGradient id="sweepRadial" cx="0%" cy="50%" r="100%">
          <stop offset="0%"   stopColor="#00c8a0" stopOpacity="0.60" />
          <stop offset="55%"  stopColor="#00c8a0" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#00c8a0" stopOpacity="0.0"  />
        </radialGradient>

        {/* Blip glow filter */}
        <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.8" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        {/* Soft edge clip to circle */}
        <clipPath id="radarClip">
          <circle cx="200" cy="200" r="161" />
        </clipPath>
      </defs>

      {/* Background fill */}
      <circle cx="200" cy="200" r="160" fill="url(#rg1)" />

      {/* Concentric rings */}
      {[160, 120, 80, 40].map((r, i) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none"
          stroke="#00c8a0" strokeWidth={i === 0 ? 1.4 : 0.9}
          opacity={[0.22, 0.16, 0.13, 0.10][i]} />
      ))}

      {/* 8 spoke lines every 45° */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
        const o = polar(a, 160);
        return <line key={a} x1="200" y1="200" x2={o.x} y2={o.y}
          stroke="#00c8a0" strokeWidth="0.6" opacity="0.09" />;
      })}

      {/* Outer tick marks every 30° */}
      {Array.from({ length: 12 }, (_, i) => {
        const a   = i * 30;
        const p1  = polar(a, 155);
        const p2  = polar(a, 163);
        const maj = a % 90 === 0;
        return <line key={a} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke="#00c8a0" strokeWidth={maj ? 1.6 : 0.7}
          opacity={maj ? 0.55 : 0.22} />;
      })}

      {/* Degree labels at 0° 90° 180° 270° */}
      {[
        { angle: 0,   label: '000°' },
        { angle: 90,  label: '090°' },
        { angle: 180, label: '180°' },
        { angle: 270, label: '270°' },
      ].map(({ angle, label }) => {
        const p = polar(angle, 171);
        return (
          <text key={label} x={p.x} y={p.y}
            fontSize="8" fill="rgba(0,200,160,0.55)"
            fontFamily="JetBrains Mono,monospace"
            textAnchor="middle" dominantBaseline="middle">
            {label}
          </text>
        );
      })}

      {/* ════ CLOCKWISE SWEEP ARM ════ */}
      <g className="radar-arm" clipPath="url(#radarClip)">
        {/* Wide fan wedge (~85° arc) */}
        <path d="M200,200 L200,40 A160,160 0 0,1 360,200 Z"
          fill="url(#sweepRadial)" opacity="0.70" />
        {/* Leading edge */}
        <line x1="200" y1="200" x2="200" y2="40"
          stroke="#00c8a0" strokeWidth="2.0" opacity="0.85" strokeLinecap="round" />
        {/* Bright tip on the outer ring */}
        <circle cx="200" cy="40" r="3.5" fill="#00c8a0" opacity="1">
          <animate attributeName="r" values="3.5;5;3.5" dur="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
        </circle>
        {/* Trailing fade lines for motion blur feel */}
        <line x1="200" y1="200" x2="360" y2="200"
          stroke="#00c8a0" strokeWidth="0.8" opacity="0.18" />
      </g>

      {/* Center crosshair */}
      <circle cx="200" cy="200" r="6.5" fill="none" stroke="#00c8a0" strokeWidth="1.2" opacity="0.55" />
      <circle cx="200" cy="200" r="2.8" fill="#00c8a0" />
      <line x1="193" y1="200" x2="207" y2="200" stroke="#00c8a0" strokeWidth="0.9" opacity="0.45" />
      <line x1="200" y1="193" x2="200" y2="207" stroke="#00c8a0" strokeWidth="0.9" opacity="0.45" />

      {/* ════ HIGH-VALUE BLIPS on outer rings ════ */}
      {blips.map((b) => {
        const { x, y } = polar(b.angle, b.r);
        return (
          <g key={b.cls} className={b.cls} filter="url(#glow)">
            {/* Outer glow halo */}
            {b.ring && (
              <circle cx={x} cy={y} r={b.size + 4}
                fill="none" stroke={b.color} strokeWidth="1"
                opacity="0.4" />
            )}
            {/* Main dot */}
            <circle cx={x} cy={y} r={b.size} fill={b.color} opacity="0.95" />
            {/* Bright core */}
            <circle cx={x} cy={y} r={b.size * 0.38} fill="white" opacity="0.65" />
          </g>
        );
      })}
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
            transition={{ duration: 1.2, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center">
            <div className="relative w-[380px] h-[380px]">
              <div className="absolute inset-0 rounded-full bg-teal/5 border border-teal/10" />
              <RadarSVG />
              {/* Floating framework tags */}
              {[
                { label: 'NIST CSF 2.0', pos: 'top-2 left-0',    delay: 0.8 },
                { label: 'ISO 27001',    pos: 'top-10 right-0',   delay: 1.0 },
                { label: 'Zero Trust',   pos: 'bottom-10 left-0', delay: 1.2 },
                { label: 'AI Security',  pos: 'bottom-2 right-0', delay: 1.4 },
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
