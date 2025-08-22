import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Award, 
  Shield, 
  Recycle, 
  Phone, 
  Mail, 
  MapPin,
  Send,
  CheckCircle,
  ArrowRight,
  Factory,
  Users,
  Globe
} from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Legacy from './components/Legacy';
import WhyUs from './components/WhyUs';
import Manufacturing from './components/Manufacturing';
import TestReports from './components/TestReports';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />
      <Hero />
      <Legacy />
      <WhyUs />
      <Manufacturing />
      <TestReports />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;