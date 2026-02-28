import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import Navbar from '../components/Navbar';
import AuthModal from '../components/AuthModal';
import { motion, useInView, animate, useScroll, useTransform, useSpring } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL COMPONENT — reliable IntersectionObserver wrapper
   Each instance creates its own ref + useInView for guaranteed trigger
   ═══════════════════════════════════════════════════════════ */
function ScrollReveal({ children, animation = 'fade-up', delay = 0, duration = 0.7, className = '', once = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-15% 0px -15% 0px" });

  const animationStyles = {
    'fade-up': {
      initial: { opacity: 0, transform: 'translateY(60px)' },
      animate: { opacity: 1, transform: 'translateY(0px)' }
    },
    'fade-down': {
      initial: { opacity: 0, transform: 'translateY(-60px)' },
      animate: { opacity: 1, transform: 'translateY(0px)' }
    },
    'slide-left': {
      initial: { opacity: 0, transform: 'translateX(-100px) rotate(-3deg)' },
      animate: { opacity: 1, transform: 'translateX(0px) rotate(0deg)' }
    },
    'slide-right': {
      initial: { opacity: 0, transform: 'translateX(100px) rotate(3deg)' },
      animate: { opacity: 1, transform: 'translateX(0px) rotate(0deg)' }
    },
    'scale-up': {
      initial: { opacity: 0, transform: 'scale(0.7)' },
      animate: { opacity: 1, transform: 'scale(1)' }
    },
    'flip-up': {
      initial: { opacity: 0, transform: 'perspective(800px) rotateX(25deg) translateY(40px)' },
      animate: { opacity: 1, transform: 'perspective(800px) rotateX(0deg) translateY(0px)' }
    },
    'zoom-rotate': {
      initial: { opacity: 0, transform: 'scale(0.5) rotate(-10deg)' },
      animate: { opacity: 1, transform: 'scale(1) rotate(0deg)' }
    },
    'blur-in': {
      initial: { opacity: 0, transform: 'translateY(30px) scale(0.95)', filter: 'blur(10px)' },
      animate: { opacity: 1, transform: 'translateY(0px) scale(1)', filter: 'blur(0px)' }
    },
  };

  const anim = animationStyles[animation] || animationStyles['fade-up'];
  const currentStyle = isInView ? anim.animate : anim.initial;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...currentStyle,
        transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: 'transform, opacity, filter'
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const FEATURES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    ),
    title: 'AI Chatbot Assistant',
    desc: 'Get instant answers to your engineering queries with our intelligent AI-powered chatbot, available 24/7.',
    color: 'from-cyan-500 to-blue-500',
    bg: '#a3e635',
    image: '/images/ai_chatbot.svg'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    title: '3D CNC Lathe Model',
    desc: 'Explore every component of a CNC lathe in an interactive 3D environment. Rotate, zoom, and learn.',
    color: 'from-purple-500 to-pink-500',
    bg: '#c084fc',
    image: '/images/chuck.png'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
    title: '3D VMC Model',
    desc: 'Visualize and interact with a Vertical Machining Center model to understand milling operations.',
    color: 'from-emerald-500 to-teal-500',
    bg: '#34d399',
    image: '/images/vmc_spindle.png'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    title: 'Smart File Sharing',
    desc: 'Teachers upload notes, assignments, and resources. Students access everything from one centralized hub.',
    color: 'from-amber-500 to-orange-500',
    bg: '#fbbf24',
    image: '/images/file_sharing.svg'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    title: 'G & M Code Reference',
    desc: 'A comprehensive, searchable reference for all G-codes and M-codes used in CNC programming.',
    color: 'from-rose-500 to-red-500',
    bg: '#fb7185',
    image: '/images/gcode_reference.svg'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
      </svg>
    ),
    title: 'CNC Control Panel',
    desc: 'Practice with a simulated CNC control panel to master machine operations before hands-on training.',
    color: 'from-indigo-500 to-violet-500',
    bg: '#818cf8',
    image: '/images/vmc_control_panel.png'
  }
];

const STEPS = [
  { num: '01', title: 'Create Your Account', desc: 'Sign up as a student or teacher in seconds. Your personalized dashboard awaits.' },
  { num: '02', title: 'Access Your Dashboard', desc: 'Get instant access to all learning tools, 3D models, notes, and resources.' },
  { num: '03', title: 'Explore Interactive Tools', desc: 'Dive into 3D models, use the AI chatbot, study G/M codes, and practice on simulators.' },
  { num: '04', title: 'Master Your Skills', desc: 'Build real-world CNC & VMC expertise through hands-on interactive learning.' }
];

const STATS = [
  { value: 3, suffix: '', label: 'Interactive 3D Models' },
  { value: 3, suffix: '', label: 'Interactive Images' },
  { value: 15, suffix: '', label: 'Engineering Tools & Inserts' },
  { value: 6, suffix: '', label: 'Core Learning Modules' }
];

/* ═══════════════════════════════════════════════════════════
   CAROUSEL COMPONENT
   ═══════════════════════════════════════════════════════════ */
const InteractiveCoverflowCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragX = useRef(0);
  const scrollPos = useRef(0);
  const isDragging = useRef(false);
  const containerRef = useRef(null);

  const cardCount = FEATURES.length;

  const animatedScroll = useSpring(0, {
    stiffness: 120,
    damping: 22,
    mass: 1
  });

  const handleDragStart = (e, info) => {
    isDragging.current = true;
    dragX.current = info.point.x;
    animatedScroll.stop();
  };

  const handleDrag = (e, info) => {
    if (!isDragging.current) return;
    const deltaX = info.point.x - dragX.current;
    dragX.current = info.point.x;
    const dragFactor = window.innerWidth < 768 ? 180 : 300;
    scrollPos.current -= deltaX / dragFactor;
    animatedScroll.set(scrollPos.current);
  };

  const handleDragEnd = (e, info) => {
    isDragging.current = false;
    const dragFactor = window.innerWidth < 768 ? 180 : 300;
    const velocity = -info.velocity.x / dragFactor;
    let target = Math.round(scrollPos.current + velocity * 0.15);
    setActiveIndex((target % cardCount + cardCount) % cardCount);
    scrollPos.current = target;
    animatedScroll.set(target);
  };

  return (
    <section id="features" className="relative py-12 px-4 overflow-hidden flex flex-col items-center justify-center z-10">
      <ScrollReveal animation="blur-in">
        <div className="text-center z-10 mb-14 pointer-events-none w-full">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Features</span>
          <h2 className="text-4xl sm:text-6xl font-bold mb-4 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Everything You Need to <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Learn & Teach</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg sm:text-xl" style={{ fontFamily: 'Inter, sans-serif' }}>
            Drag to explore our six powerful learning tools.
          </p>
        </div>
      </ScrollReveal>

      <div
        ref={containerRef}
        className="relative w-full max-w-[1400px] h-[680px] sm:h-[780px] flex items-center justify-center overflow-visible"
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-40 cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'none' }}
        />

        {FEATURES.map((f, i) => {
          const cardTransform = useTransform(animatedScroll, (currentScroll) => {
            let diff = (i - currentScroll) % cardCount;
            if (diff > cardCount / 2) diff -= cardCount;
            if (diff < -cardCount / 2) diff += cardCount;

            const absDiff = Math.abs(diff);
            const sign = Math.sign(diff);

            const isMobile = window.innerWidth < 768;
            const centerSpacing = isMobile ? 280 : 520;
            const x = diff * centerSpacing;
            const rotate = sign * 20 * Math.min(absDiff, 1);
            const scale = 1;
            // Add a dynamic Y offset based on rotation to compensate for the corners dipping
            const y = Math.min(absDiff, 1) * -30;
            const opacity = absDiff > 2.5 ? 0 : 1;
            const cardZIndex = 30 - Math.round(absDiff * 10);

            return { x, y, rotate, scale, opacity, zIndex: cardZIndex };
          });

          return (
            <motion.div
              key={i}
              className="absolute w-[75vw] sm:w-[420px] h-[580px] sm:h-[640px] rounded-[32px] p-7 flex flex-col items-center overflow-hidden will-change-transform"
              style={{
                backgroundColor: f.bg,
                x: useTransform(cardTransform, (t) => t.x),
                y: useTransform(cardTransform, (t) => t.y),
                rotate: useTransform(cardTransform, (t) => t.rotate),
                scale: useTransform(cardTransform, (t) => t.scale),
                opacity: useTransform(cardTransform, (t) => t.opacity),
                zIndex: useTransform(cardTransform, (t) => t.zIndex),
                transformOrigin: '50% 100%',
                boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
              }}
            >
              <div className="relative z-10 w-full flex flex-col items-center mt-2">
                <div className="px-4 py-1.5 rounded-full bg-black/10 text-black/60 text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase mb-6 leading-none">
                  Part of the <span className="text-black/90 ml-0.5">Platform</span>
                </div>
                <div className="w-12 h-12 flex items-center justify-center mb-6">
                  {React.cloneElement(f.icon, { className: 'w-8 h-8 text-black/70', style: { stroke: 'rgba(0,0,0,0.7)' } })}
                </div>
                <div className="text-center px-2 w-full">
                  <h3 className="text-4xl sm:text-[44px] font-extrabold mb-4 text-black/90 leading-[1.1] line-clamp-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {f.title}
                  </h3>
                  <p className="text-black/50 text-sm sm:text-[15px] leading-relaxed line-clamp-3 mx-auto max-w-[85%]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {f.desc}
                  </p>
                </div>
              </div>

              <div className="relative z-10 w-full mt-auto mb-8 h-[200px] sm:h-[220px] rounded-[40px] bg-black/10 flex items-center justify-center overflow-hidden p-6 shadow-inner">
                {f.image ? (
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-black/20 rounded-3xl animate-pulse" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════ */
function AnimatedCounter({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(v) {
          if (ref.current) {
            ref.current.textContent = Math.round(v) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, suffix]);

  return (
    <span
      ref={ref}
      className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
      dangerouslySetInnerHTML={{ __html: `0${suffix}` }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════════════════════════════ */
function HomePage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authRole, setAuthRole] = useState('student');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const openAuth = (role, mode = 'login') => {
    setAuthRole(role);
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  useEffect(() => {
    if (!user) return;
    navigate(user.role === 'student' ? '/student-dashboard' : '/teacher-dashboard');
  }, [user, navigate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => { });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07080a] text-white overflow-x-hidden">

      {/* ===== VIDEO BACKGROUND ===== */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay loop muted playsInline preload="metadata"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#07080a]" />
      </div>

      <Navbar onOpenAuth={openAuth} />

      {/* ===== 1. HERO ===== */}
      <section className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal animation="fade-down" delay={0}>
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-medium tracking-wide">
              🚀 The Future of Engineering Education
            </div>
          </ScrollReveal>

          <ScrollReveal animation="blur-in" delay={0.15}>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight mb-6 leading-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent">
                Master CNC & VMC
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Engineering
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.3}>
            <p
              className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              An interactive learning platform with 3D machine models, AI-powered assistance,
              and hands-on simulation tools — designed for students and educators in manufacturing technology.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="scale-up" delay={0.45}>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => openAuth('student', 'login')}
                className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-base
                shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/40"
              >
                I'm a Student
                <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
              <button
                onClick={() => openAuth('teacher', 'login')}
                className="group px-8 py-3.5 rounded-full border border-white/20 bg-white/5 font-semibold text-base
                backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/30"
              >
                I'm a Teacher
                <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.7}>
            <div className="mt-8 animate-bounce">
              <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 2. ABOUT — slide-left text + zoom-rotate cards ===== */}
      <section className="relative z-10 pt-4 pb-12 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal animation="slide-left" duration={0.9}>
            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4 block">About the Platform</span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              What is{' '}<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Mechtron</span>?
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              Mechtron is a comprehensive digital learning platform built specifically for
              manufacturing technology education. We combine <strong className="text-white">interactive 3D models</strong>,{' '}
              <strong className="text-white">AI-powered tools</strong>, and{' '}
              <strong className="text-white">real-time collaboration</strong> to help students and teachers master CNC and VMC engineering.
            </p>
            <p className="text-gray-400 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              From understanding machine components through immersive 3D visualization to practicing
              G-code programming with instant AI feedback — Mechtron bridges the gap between theoretical
              knowledge and practical expertise.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🎓', label: 'Built for Students & Teachers' },
              { icon: '🔧', label: 'CNC & VMC Focused' },
              { icon: '🤖', label: 'AI-Powered Learning' },
              { icon: '🌐', label: 'Access Anywhere, Anytime' }
            ].map((item, i) => (
              <ScrollReveal key={i} animation="zoom-rotate" delay={0.1 + i * 0.12} duration={0.6}>
                <div className="group bg-white/[0.04] border border-white/10 rounded-2xl p-6
                  backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:border-cyan-500/30">
                  <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">{item.icon}</div>
                  <p className="text-sm font-medium text-gray-200">{item.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. PLATFORM FEATURES (Carousel) ===== */}
      <InteractiveCoverflowCarousel />

      {/* ===== 4. STATS — flip-up reveal ===== */}
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal animation="flip-up" duration={0.8}>
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-10 sm:p-14 backdrop-blur-sm">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
                {STATS.map((s, i) => (
                  <ScrollReveal key={i} animation="scale-up" delay={0.1 + i * 0.1} duration={0.5}>
                    <div className="space-y-2">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                      <p className="text-gray-400 text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{s.label}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 5. HOW IT WORKS — staggered slide-left steps ===== */}
      <section id="how" className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="blur-in">
            <div className="text-center mb-16">
              <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4 block">How It Works</span>
              <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Get Started in{' '}<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">4 Simple Steps</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent -z-10" />
            <div className="space-y-12">
              {STEPS.map((step, i) => (
                <ScrollReveal key={i} animation="slide-left" delay={i * 0.15} duration={0.8}>
                  <div className="flex items-start gap-6 sm:gap-8">
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600
                      flex items-center justify-center text-lg sm:text-xl font-bold shadow-lg shadow-cyan-500/20">
                      {step.num}
                    </div>
                    <div className="pt-1 sm:pt-3">
                      <h4 className="text-xl sm:text-2xl font-semibold mb-2 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {step.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. FOOTER ===== */}
      <section className="relative z-10 py-12 px-4">
        <div className="section-divider mb-12" />
        <p className="text-center text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
          © 2026 Mechtron — DKTE YCP — Department of Mechanical Engineering
        </p>
      </section>

      {/* ===== AUTH MODAL ===== */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode={authMode}
          role={authRole}
          onSwitchMode={setAuthMode}
        />
      )}
    </div>
  );
}

export default HomePage;
