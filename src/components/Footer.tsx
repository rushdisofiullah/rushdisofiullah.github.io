import { Shield, Mail, Link2, ArrowUp } from 'lucide-react';
import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center">
              <Shield size={16} className="text-teal" />
            </div>
            <div>
              <p className="font-display font-semibold text-white text-sm">{profile.name}</p>
              <p className="font-mono text-[10px] text-slate-600">Senior GM – Cybersecurity · Robi Axiata PLC</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href={`mailto:${profile.email}`}
              className="w-9 h-9 rounded-lg border border-white/8 flex items-center justify-center text-slate-500 hover:text-teal hover:border-teal/25 transition-all">
              <Mail size={15} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-white/8 flex items-center justify-center text-slate-500 hover:text-blue-400 hover:border-blue-400/25 transition-all">
              <Link2 size={15} />
            </a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-9 h-9 rounded-lg border border-white/8 flex items-center justify-center text-slate-500 hover:text-teal hover:border-teal/25 transition-all">
              <ArrowUp size={15} />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[11px] text-slate-700">
            © {new Date().getFullYear()} Abul Hasnat Md Sofi Ullah · {profile.location}
          </p>
          <p className="font-mono text-[11px] text-slate-700">
            Cybersecurity Leader · Enterprise Security Architect · GRC Executive
          </p>
        </div>
      </div>
    </footer>
  );
}
