import { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { profile } from '../data/profile';
import { useActiveSection } from '../hooks/useScrollAnimation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sectionIds = profile.nav.map(n => n.href.replace('#', ''));
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/5 shadow-2xl' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-teal/10 border border-teal/30 flex items-center justify-center group-hover:bg-teal/20 transition-colors">
              <Shield size={16} className="text-teal" />
            </div>
            <span className="font-mono text-xs text-teal/80 tracking-widest hidden sm:block">SOFI_ULLAH.SEC</span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {profile.nav.map(n => {
              const id = n.href.replace('#', '');
              return (
                <button key={n.href} onClick={() => scrollTo(n.href)}
                  className={`px-3 py-1.5 rounded-md font-mono text-xs tracking-wider transition-all duration-200
                    ${active === id ? 'text-teal bg-teal/10' : 'text-slate-400 hover:text-teal hover:bg-white/5'}`}>
                  {n.label}
                </button>
              );
            })}
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
              className="ml-4 px-4 py-1.5 rounded-md border border-teal/30 text-teal font-mono text-xs tracking-wider hover:bg-teal/10 transition-all duration-200">
              LinkedIn →
            </a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} className="lg:hidden text-slate-400 hover:text-teal transition-colors p-1">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden glass border-t border-white/5">
          <div className="px-4 py-4 space-y-1">
            {profile.nav.map(n => (
              <button key={n.href} onClick={() => scrollTo(n.href)}
                className="w-full text-left px-3 py-2 rounded-md font-mono text-sm text-slate-300 hover:text-teal hover:bg-white/5 transition-all">
                {n.label}
              </button>
            ))}
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
              className="block px-3 py-2 mt-2 rounded-md border border-teal/30 text-teal font-mono text-sm hover:bg-teal/10 transition-all text-center">
              LinkedIn Profile →
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
