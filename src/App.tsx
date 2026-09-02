import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Expertise from './components/Expertise';
import Tools from './components/Tools';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Loader from './components/Loader';

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      {!loading && (
        <div className="relative min-h-screen">
          <Navbar />
          <main>
            <Hero />
            <div className="section-divider" />
            <About />
            <div className="section-divider" />
            <Experience />
            <div className="section-divider" />
            <Expertise />
            <div className="section-divider" />
            <Tools />
            <div className="section-divider" />
            <Achievements />
            <div className="section-divider" />
            <Education />
            <div className="section-divider" />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </div>
      )}
    </>
  );
}
