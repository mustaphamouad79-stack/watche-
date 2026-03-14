/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ShieldCheck, Gem, Headset, Smartphone, MessageSquare, Phone, Globe, ArrowRight, Clock, Moon, Sun, Sunrise } from 'lucide-react';
import { translations, Language } from './translations';

type Theme = 'midnight' | 'sunset' | 'night';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('midnight');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const t = translations[lang];
  const isRtl = lang === 'ar';
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Sound effect for interactions
  const playInquirySound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.4;
    audio.play().catch(e => console.log("Audio play blocked by browser", e));
  };

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lang, isRtl]);

  const formattedTime = currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : lang === 'fr' ? 'fr-FR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: lang === 'en'
  });

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen transition-colors duration-1000 text-[#f5f2ed] font-sans selection:bg-[#c5a059] selection:text-black relative overflow-hidden ${isRtl ? 'font-arabic' : ''} ${
        theme === 'midnight' ? 'bg-[#0a0a0a]' : 
        theme === 'sunset' ? 'bg-[#1a0f0a]' : 
        'bg-[#050a14]'
      }`}
      style={{ 
        '--mouse-x': `${mousePos.x}px`, 
        '--mouse-y': `${mousePos.y}px`,
        '--accent-color': theme === 'midnight' ? '#c5a059' : theme === 'sunset' ? '#f27d26' : '#8e9299',
        '--spotlight-color': theme === 'midnight' ? 'rgba(197, 160, 89, 0.15)' : theme === 'sunset' ? 'rgba(242, 125, 38, 0.15)' : 'rgba(142, 146, 153, 0.15)'
      } as React.CSSProperties}
    >
      {/* Spotlight Effect */}
      <div className="fixed inset-0 spotlight pointer-events-none z-10" />

      {/* Background Typographic Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03] z-0 select-none">
        <div className="absolute top-20 -left-20 text-[20vw] font-serif font-bold text-stroke rotate-12">PRECISION</div>
        <div className="absolute bottom-40 -right-20 text-[15vw] font-serif font-bold text-stroke -rotate-6">HERITAGE</div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-serif tracking-widest font-bold">M.M</div>
            <div className="hidden lg:flex items-center gap-2 text-[10px] tracking-[0.2em] text-[var(--accent-color)] border border-[var(--accent-color)]/30 px-3 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              <span className="font-mono">{formattedTime}</span>
            </div>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium text-white/60">
            <a href="#collection" className="hover:text-[#c5a059] transition-colors relative group">
              {t.nav.collection}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c5a059] transition-all group-hover:w-full" />
            </a>
            <a href="#heritage" className="hover:text-[#c5a059] transition-colors relative group">
              {t.nav.heritage}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c5a059] transition-all group-hover:w-full" />
            </a>
            <a href="#concierge" className="hover:text-[#c5a059] transition-colors relative group">
              {t.nav.concierge}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c5a059] transition-all group-hover:w-full" />
            </a>
          </div>

            <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 border-x border-white/10 px-4">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setTheme('midnight')}
                  className={`p-1.5 rounded-full transition-all ${theme === 'midnight' ? 'bg-[var(--accent-color)] text-black' : 'text-white/40 hover:text-white'}`}
                  title={t.themes.midnight}
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setTheme('sunset')}
                  className={`p-1.5 rounded-full transition-all ${theme === 'sunset' ? 'bg-[var(--accent-color)] text-black' : 'text-white/40 hover:text-white'}`}
                  title={t.themes.sunset}
                >
                  <Sunrise className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setTheme('night')}
                  className={`p-1.5 rounded-full transition-all ${theme === 'night' ? 'bg-[var(--accent-color)] text-black' : 'text-white/40 hover:text-white'}`}
                  title={t.themes.night}
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="w-[1px] h-4 bg-white/10 mx-2" />

              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[var(--accent-color)]" />
                <select 
                  value={lang} 
                  onChange={(e) => setLang(e.target.value as Language)}
                  className="bg-transparent text-xs uppercase tracking-widest focus:outline-none cursor-pointer text-white/80 hover:text-[var(--accent-color)] transition-colors"
                >
                  <option value="en" className="bg-black text-white">EN</option>
                  <option value="fr" className="bg-black text-white">FR</option>
                  <option value="ar" className="bg-black text-white">AR</option>
                </select>
              </div>
            </div>
            <button 
              onClick={() => {
                playInquirySound();
                window.open('https://wa.me/212710211532', '_blank');
              }}
              className="px-6 py-2 border border-[var(--accent-color)] text-[var(--accent-color)] text-xs uppercase tracking-widest hover:bg-[var(--accent-color)] hover:text-black transition-all duration-300"
            >
              {t.nav.inquire}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Watch Detail" 
            className="w-full h-full object-cover opacity-40 scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={lang}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className={`text-6xl md:text-[10rem] font-serif mb-8 leading-[0.85] tracking-tighter ${isRtl ? 'md:text-8xl' : ''}`}>
                {t.hero.headline.split(' ').map((word, i) => (
                  <span key={i} className="inline-block">
                    {word.toLowerCase() === 'timeless' || word === 'خالدة' || word.toLowerCase() === 'intemporelle' ? 
                      <span className="italic text-[#c5a059] relative">
                        {word}
                        <motion.span 
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ delay: 1, duration: 1 }}
                          className="absolute -bottom-2 left-0 h-[2px] bg-[#c5a059]/30"
                        />
                      </span> : 
                      <span>{word}</span>
                    }
                    &nbsp;
                  </span>
                ))}
              </h1>
              <p className="text-xl md:text-2xl text-white/60 font-light tracking-wide max-w-2xl mx-auto mb-12 leading-relaxed">
                {t.hero.subheadline}
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a 
                  href="#collection"
                  onClick={playInquirySound}
                  className="group relative bg-[var(--accent-color)] text-black px-12 py-5 text-sm uppercase tracking-[0.3em] font-bold overflow-hidden transition-all hover:pr-16"
                >
                  <span className="relative z-10">{t.hero.cta}</span>
                  <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
                </a>
                <button className="text-white/40 hover:text-[var(--accent-color)] transition-colors text-xs uppercase tracking-[0.4em] border-b border-white/10 pb-1">
                  View Lookbook
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Marquee Accent */}
        <div className="absolute bottom-0 w-full py-4 border-t border-white/5 bg-black/20 backdrop-blur-sm z-20">
          <div className="marquee">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-[10px] uppercase tracking-[0.5em] text-white/20 mx-12">
                Authenticity Guaranteed • Worldwide Concierge • Expert Curation • Est. 2026 • 
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Editorial Section */}
      <section id="heritage" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-xs uppercase tracking-[0.5em] text-[var(--accent-color)] font-bold">{t.mission.title}</h2>
              <h3 className="text-5xl md:text-7xl font-serif leading-tight italic">
                Crafting <br />
                <span className="not-italic text-stroke">Legacies</span>
              </h3>
              <p className="text-xl text-white/60 font-light leading-relaxed italic">
                "{t.mission.content}"
              </p>
            </motion.div>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-2 gap-6 relative">
            <motion.div 
              style={{ y: y1 }}
              className="aspect-[3/4] rounded-full overflow-hidden border border-white/10 mt-20"
            >
              <img src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800" alt="Watch 1" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              style={{ y: y2 }}
              className="aspect-[3/4] rounded-full overflow-hidden border border-white/10 -mt-20"
            >
              <img src="https://images.unsplash.com/photo-1508685096489-7aac29145fe0?auto=format&fit=crop&q=80&w=800" alt="Watch 2" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
            </motion.div>
            
            {/* Floating Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[var(--accent-color)] flex items-center justify-center text-black text-center p-4 rotate-12 shadow-2xl z-20">
              <span className="text-[10px] font-bold uppercase tracking-tighter leading-none">Certified <br />Authentic <br />2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Large Live Precision Clock Section */}
      <section className="py-32 px-6 relative border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-xs uppercase tracking-[0.5em] text-[var(--accent-color)] mb-6 font-bold">Precision Engineering</h2>
            <h3 className="text-4xl md:text-6xl font-serif mb-8">The Heartbeat of M.M</h3>
          </motion.div>

          <div className="relative inline-block">
            {/* Decorative Rings */}
            <div className="absolute inset-0 -m-8 border border-[var(--accent-color)]/10 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-0 -m-16 border border-[var(--accent-color)]/5 rounded-full animate-[spin_120s_linear_infinite_reverse]" />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="relative bg-black border border-[var(--accent-color)]/20 rounded-full w-64 h-64 md:w-96 md:h-96 flex flex-col items-center justify-center shadow-[0_0_100px_rgba(197,160,89,0.1)]"
            >
              <div className="text-xs uppercase tracking-[0.4em] text-[var(--accent-color)] mb-4">Live Precision</div>
              <div className="text-4xl md:text-7xl font-mono font-bold tracking-tighter text-white">
                {formattedTime}
              </div>
              <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-pulse" />
                Atomic Sync Active
              </div>
            </motion.div>
          </div>
          
          <p className="mt-20 text-xl text-white/40 font-light max-w-2xl mx-auto italic">
            "M.M: The ultimate destination for luxury timepieces, featuring a large live precision clock, a curated collection of authentic watches, seamless mobile-optimized shopping, and dedicated personal assistance to ensure your perfect purchase."
          </p>
        </div>
      </section>

      {/* Why Shop With Us - Bento Style */}
      <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xs uppercase tracking-[0.5em] text-[var(--accent-color)] mb-6 font-bold">{t.why.badge}</h2>
              <h3 className="text-5xl md:text-6xl font-serif">{t.why.title}</h3>
            </div>
            <div className="text-white/30 font-mono text-sm">/ 01 — 03</div>
          </div>
          
          <div className="grid md:grid-cols-12 gap-6">
            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-8 p-12 bg-white/[0.02] border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 text-8xl font-serif text-white/[0.03] group-hover:text-[var(--accent-color)]/10 transition-colors">01</div>
              <ShieldCheck className="w-12 h-12 text-[var(--accent-color)] mb-8" />
              <h4 className="text-3xl font-serif mb-6">{t.why.card1.title}</h4>
              <p className="text-lg text-white/50 font-light max-w-xl leading-relaxed">
                {t.why.card1.desc}
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-4 p-12 bg-[var(--accent-color)] text-black relative overflow-hidden group"
            >
              <Gem className="w-12 h-12 mb-8" />
              <h4 className="text-3xl font-serif mb-6">{t.why.card2.title}</h4>
              <p className="text-black/70 font-medium leading-relaxed">
                {t.why.card2.desc}
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-12 p-12 bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center gap-12 group"
            >
              <div className="flex-1">
                <Headset className="w-12 h-12 text-[var(--accent-color)] mb-8" />
                <h4 className="text-3xl font-serif mb-6">{t.why.card3.title}</h4>
                <p className="text-lg text-white/50 font-light leading-relaxed">
                  {t.why.card3.desc}
                </p>
              </div>
              <div className="w-full md:w-1/3 aspect-video rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src="https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&q=80&w=800" alt="Service" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section id="collection" className="py-32 px-6 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h2 className="text-xs uppercase tracking-[0.5em] text-[var(--accent-color)] mb-6 font-bold">{t.collection.badge}</h2>
              <h3 className="text-5xl md:text-6xl font-serif">{t.collection.title}</h3>
            </motion.div>
            <button 
              onClick={() => {
                playInquirySound();
                window.open('https://wa.me/212710211532?text=Hello, I would like to see your full collection.', '_blank');
              }}
              className="text-[var(--accent-color)] text-xs uppercase tracking-[0.3em] border-b border-[var(--accent-color)]/30 pb-2 hover:border-[var(--accent-color)] transition-all"
            >
              {t.collection.viewAll}
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { id: 'rolex', img: 'https://images.unsplash.com/photo-1587836374828-4dbaba94cf0e?auto=format&fit=crop&q=80&w=800', data: t.collection.rolex },
              { id: 'patek', img: 'https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&q=80&w=800', data: t.collection.patek },
              { id: 'ap', img: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800', data: t.collection.ap }
            ].map((item, idx) => (
              <motion.a
                key={item.id}
                href={`https://wa.me/212710211532?text=${encodeURIComponent(`Hello, please, how much is this ${item.data.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playInquirySound}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group cursor-pointer block"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-8 border border-white/5">
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-black/80 backdrop-blur-md text-[var(--accent-color)] text-[10px] uppercase tracking-widest px-3 py-1 border border-[var(--accent-color)]/30">
                      {item.data.tag}
                    </span>
                  </div>
                  <img 
                    src={item.img} 
                    alt={item.data.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs uppercase tracking-[0.4em] border border-white/30 px-6 py-3 backdrop-blur-sm">
                      {t.nav.inquire}
                    </span>
                  </div>
                </div>
                <h4 className="text-xl font-serif mb-2 group-hover:text-[var(--accent-color)] transition-colors">{item.data.name}</h4>
                <p className="text-white/40 text-sm uppercase tracking-widest">{item.data.price}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Concierge Section */}
      <section id="concierge" className="py-32 px-6 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xs uppercase tracking-[0.5em] text-[var(--accent-color)] mb-8 font-bold">{t.concierge.badge}</h2>
              <h3 className="text-5xl md:text-7xl font-serif mb-10 leading-[0.9]">{t.concierge.title}</h3>
              <p className="text-xl text-white/50 font-light leading-relaxed mb-12">
                {t.concierge.desc}
              </p>
              <div className="flex items-center gap-6">
                <div className="w-16 h-[1px] bg-[var(--accent-color)]" />
                <span className="text-xs uppercase tracking-[0.4em] text-[var(--accent-color)]">Private Consultation</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] border border-white/5 p-12 backdrop-blur-xl"
            >
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30">{t.concierge.name}</label>
                    <input type="text" className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[var(--accent-color)] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30">{t.concierge.email}</label>
                    <input type="email" className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[var(--accent-color)] transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/30">{t.concierge.interest}</label>
                  <select className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[var(--accent-color)] transition-colors cursor-pointer">
                    <option className="bg-black">Rolex</option>
                    <option className="bg-black">Patek Philippe</option>
                    <option className="bg-black">Audemars Piguet</option>
                    <option className="bg-black">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/30">{t.concierge.message}</label>
                  <textarea rows={3} className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[var(--accent-color)] transition-colors resize-none" />
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    playInquirySound();
                  }}
                  className="w-full bg-[var(--accent-color)] text-black py-5 text-xs uppercase tracking-[0.4em] font-bold hover:bg-white transition-all"
                >
                  {t.concierge.submit}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support & Accessibility - Immersive */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=2000" alt="Background" className="w-full h-full object-cover blur-3xl" referrerPolicy="no-referrer" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute -inset-4 bg-[#c5a059]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative aspect-square rounded-full border border-white/10 p-4">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1000" 
                      alt="Luxury Lifestyle" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-12">
              <div>
                <h2 className="text-xs uppercase tracking-[0.5em] text-[var(--accent-color)] mb-8 font-bold">{t.support.badge}</h2>
                <h3 className="text-5xl md:text-7xl font-serif mb-10 leading-[0.9]">{t.support.title}</h3>
                <p className="text-xl text-white/50 font-light leading-relaxed">
                  {t.support.desc}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-8 border border-white/5 bg-white/[0.01] backdrop-blur-sm hover:bg-white/[0.03] transition-colors">
                  <Phone className="w-6 h-6 text-[var(--accent-color)] mb-4" />
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">{t.support.direct}</p>
                  <p className="text-xl font-serif" dir="ltr">+1 (800) LUX-TIME</p>
                </div>
                <a 
                  href="https://wa.me/212710211532" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-8 border border-white/5 bg-white/[0.01] backdrop-blur-sm hover:bg-white/[0.03] transition-colors group/wa"
                >
                  <MessageSquare className="w-6 h-6 text-[var(--accent-color)] mb-4 group-hover/wa:scale-110 transition-transform" />
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">{t.support.whatsapp}</p>
                  <p className="text-xl font-serif text-[var(--accent-color)]">+212 710-211532</p>
                  <p className="text-[10px] text-white/20 mt-2 uppercase tracking-widest">{t.support.whatsappDesc}</p>
                </a>
              </div>
              
              <div className="pt-8 border-t border-white/5">
                <p className={`text-3xl font-serif italic text-[var(--accent-color)] ${isRtl ? 'not-italic' : ''}`}>
                  "{t.support.quote}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/10 bg-black relative z-20">
        <div className="max-w-7xl mx-auto">
          {/* Newsletter Section */}
          <div className="grid lg:grid-cols-2 gap-16 mb-24 pb-24 border-b border-white/5">
            <div>
              <h4 className="text-3xl font-serif mb-4">{t.footer.newsletter}</h4>
              <p className="text-white/40 font-light max-w-md">{t.footer.newsletterDesc}</p>
            </div>
            <div className="flex items-end">
              <div className="flex-1 flex border-b border-white/20 pb-2 focus-within:border-[#c5a059] transition-colors">
                <input 
                  type="email" 
                  placeholder={t.footer.placeholder}
                  className="bg-transparent w-full focus:outline-none text-sm"
                />
                <button className="text-[#c5a059] text-[10px] uppercase tracking-widest font-bold">
                  {t.footer.subscribe}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
            <div className="space-y-6">
              <div className="text-4xl font-serif tracking-widest font-bold">M.M</div>
              <p className="text-white/40 max-w-xs font-light tracking-wide">
                The world's most trusted destination for authentic luxury timepieces.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h5 className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-color)] font-bold">Discover</h5>
                <ul className="text-sm text-white/40 space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Rolex</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Patek Philippe</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Audemars Piguet</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-color)] font-bold">Company</h5>
                <ul className="text-sm text-white/40 space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Authenticity</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-color)] font-bold">Support</h5>
                <ul className="text-sm text-white/40 space-y-2">
                  <li><a href="https://wa.me/212710211532" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-color)] transition-colors">WhatsApp: +212 710-211532</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
            <div className="text-white/20 text-[10px] uppercase tracking-[0.2em]">
              {t.footer.rights}
            </div >
            <div className="flex gap-8">
              <a href="#" className="text-white/20 hover:text-[#c5a059] transition-colors uppercase text-[10px] tracking-widest">Instagram</a>
              <a href="#" className="text-white/20 hover:text-[#c5a059] transition-colors uppercase text-[10px] tracking-widest">LinkedIn</a>
              <a href="#" className="text-white/20 hover:text-[#c5a059] transition-colors uppercase text-[10px] tracking-widest">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
