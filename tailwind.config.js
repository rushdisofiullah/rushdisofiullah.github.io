/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#02060f',
          900: '#040b17',
          800: '#071020',
          700: '#0a1628',
          600: '#0e1e35',
          500: '#132540',
        },
        teal: {
          DEFAULT: '#00c8a0',
          400: '#33d4b4',
          300: '#66e0c8',
          200: '#99ecdc',
          glow: 'rgba(0,200,160,0.15)',
        },
        sapphire: '#0074e8',
        violet: '#7b4fff',
        amber: '#f59e0b',
        coral: '#ff6b35',
      },
      backgroundImage: {
        'grid': 'linear-gradient(rgba(0,200,160,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,160,0.04) 1px, transparent 1px)',
        'hero-gradient': 'radial-gradient(ellipse at 70% 40%, rgba(0,200,160,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(0,116,232,0.06) 0%, transparent 50%)',
      },
      backgroundSize: {
        'grid': '64px 64px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.7s ease forwards',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'spin-slow': 'spin 10s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'radar': 'radar 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulseGlow: { '0%,100%': { boxShadow: '0 0 20px rgba(0,200,160,0.3)' }, '50%': { boxShadow: '0 0 40px rgba(0,200,160,0.6)' } },
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
        radar: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer: { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
      },
      boxShadow: {
        'glow-teal': '0 0 24px rgba(0,200,160,0.25)',
        'glow-teal-lg': '0 0 48px rgba(0,200,160,0.2)',
        'glow-blue': '0 0 24px rgba(0,116,232,0.25)',
        'card': '0 1px 3px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.3)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.4), 0 0 32px rgba(0,200,160,0.1)',
      },
    },
  },
  plugins: [],
}
