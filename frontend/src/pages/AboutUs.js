import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import AuthModal from '../components/AuthModal';

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL — same pattern as HomePage
   ═══════════════════════════════════════════════════════════ */
function ScrollReveal({ children, animation = 'fade-up', delay = 0, duration = 0.7, className = '' }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });

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
            initial: { opacity: 0, transform: 'translateX(-100px)' },
            animate: { opacity: 1, transform: 'translateX(0px)' }
        },
        'slide-right': {
            initial: { opacity: 0, transform: 'translateX(100px)' },
            animate: { opacity: 1, transform: 'translateX(0px)' }
        },
        'scale-up': {
            initial: { opacity: 0, transform: 'scale(0.7)' },
            animate: { opacity: 1, transform: 'scale(1)' }
        },
        'blur-in': {
            initial: { opacity: 0, transform: 'translateY(30px) scale(0.95)', filter: 'blur(10px)' },
            animate: { opacity: 1, transform: 'translateY(0px) scale(1)', filter: 'blur(0px)' }
        },
        'flip-up': {
            initial: { opacity: 0, transform: 'perspective(800px) rotateX(25deg) translateY(40px)' },
            animate: { opacity: 1, transform: 'perspective(800px) rotateX(0deg) translateY(0px)' }
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
   TEAM DATA
   ═══════════════════════════════════════════════════════════ */
const TEAM_MEMBERS = [
    {
        name: 'Anish P. Soundattikar',
        department: 'Mechanical Engineering',
        enrollment: '23213200560',
        email: 'anishs200721@gmail.com',
        initials: 'AS',
        color: 'from-cyan-500 to-blue-600',
        glowColor: 'rgba(34, 211, 238, 0.4)',
        borderColor: 'border-cyan-500/30',
        role: 'Full Stack Developer'
    },
    {
        name: 'Aditya A. Sawant',
        department: 'Mechanical Engineering',
        enrollment: '23213200555',
        email: 'adityasawant0807@gmail.com',
        initials: 'AS',
        color: 'from-purple-500 to-pink-600',
        glowColor: 'rgba(168, 85, 247, 0.4)',
        borderColor: 'border-purple-500/30',
        role: '3D Modelling & Design'
    },
    {
        name: 'Ajay S. Powar',
        department: 'Mechanical Engineering',
        enrollment: '23213200552',
        email: 'ajaypowar165@gmail.com',
        initials: 'AP',
        color: 'from-emerald-500 to-teal-600',
        glowColor: 'rgba(52, 211, 153, 0.4)',
        borderColor: 'border-emerald-500/30',
        role: 'Research & Content'
    },
    {
        name: 'Shoaib A. Shikalgar',
        department: 'Mechanical Engineering',
        enrollment: '23213200556',
        email: 'shoaibshikalgar19@gmail.com',
        initials: 'SS',
        color: 'from-amber-500 to-orange-600',
        glowColor: 'rgba(245, 158, 11, 0.4)',
        borderColor: 'border-amber-500/30',
        role: 'UI/UX & Documentation'
    }
];

const GUIDE = {
    name: 'Mr. S. U. Misal',
    role: 'Project Guide',
    department: 'Department of Mechanical Engineering',
    description: 'Guiding this project with expertise in manufacturing technology and a vision for modernizing engineering education through interactive digital tools.'
};

/* ═══════════════════════════════════════════════════════════
   TEAM MEMBER CARD
   ═══════════════════════════════════════════════════════════ */
function TeamCard({ member, index }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <ScrollReveal animation="flip-up" delay={index * 0.12} duration={0.7}>
            <div
                className={`relative group bg-white/[0.03] backdrop-blur-md border ${member.borderColor} rounded-3xl p-8 
          transition-all duration-500 cursor-default overflow-hidden
          hover:-translate-y-3 hover:bg-white/[0.06]`}
                style={{
                    boxShadow: isHovered ? `0 25px 60px ${member.glowColor}` : '0 4px 20px rgba(0,0,0,0.3)'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Background gradient glow */}
                <div
                    className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${member.color} opacity-0 
            group-hover:opacity-20 transition-opacity duration-500 blur-3xl`}
                />

                {/* Avatar */}
                <div className="flex justify-center mb-6">
                    <div
                        className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center 
              text-3xl font-bold text-white shadow-lg transition-all duration-500
              group-hover:scale-110 group-hover:rounded-xl group-hover:shadow-2xl`}
                        style={{
                            boxShadow: isHovered ? `0 12px 40px ${member.glowColor}` : '0 4px 15px rgba(0,0,0,0.3)',
                            fontFamily: 'Space Grotesk, sans-serif'
                        }}
                    >
                        {member.initials}
                    </div>
                </div>

                {/* Name */}
                <h3
                    className="text-xl font-bold text-white text-center mb-1 transition-colors duration-300"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    {member.name}
                </h3>

                {/* Role badge */}
                <div className="flex justify-center mb-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${member.color} bg-opacity-20 text-white/80 tracking-wide`}>
                        {member.role}
                    </span>
                </div>

                {/* Department */}
                <p className="text-gray-400 text-sm text-center mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {member.department}
                </p>

                {/* Enrollment */}
                <p className="text-gray-500 text-xs text-center mb-5 font-mono">
                    Enrollment: {member.enrollment}
                </p>

                {/* Divider */}
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-5" />

                {/* Email */}
                <div className="flex justify-center">
                    <a
                        href={`mailto:${member.email}`}
                        className={`group/email flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        <span className="group-hover/email:underline">{member.email}</span>
                    </a>
                </div>
            </div>
        </ScrollReveal>
    );
}

/* ═══════════════════════════════════════════════════════════
   ABOUT US PAGE
   ═══════════════════════════════════════════════════════════ */
function AboutUs() {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [authRole, setAuthRole] = useState('student');

    const openAuth = (role, mode = 'login') => {
        setAuthRole(role);
        setAuthMode(mode);
        setShowAuthModal(true);
    };

    return (
        <div className="relative min-h-screen bg-[#07080a] text-white overflow-x-hidden">

            {/* ===== BACKGROUND ===== */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[#07080a]" />
                {/* Subtle radial gradient backgrounds */}
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full bg-cyan-500/[0.03] blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/[0.03] blur-[120px]" />
            </div>

            <Navbar onOpenAuth={openAuth} />

            {/* ===== 1. HERO ===== */}
            <section className="relative z-10 flex items-center justify-center pt-32 pb-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal animation="fade-down" delay={0}>
                        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-medium tracking-wide">
                            🎓 Final Year Project — Mechanical Engineering
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="blur-in" delay={0.15}>
                        <h1
                            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                            <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent">
                                Meet The
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Team
                            </span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={0.3}>
                        <p
                            className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 mb-4 leading-relaxed"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            We are a team of passionate mechanical engineering students who built{' '}
                            <strong className="text-white">Mechtron</strong> — an interactive
                            learning platform to revolutionize CNC & VMC education.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ===== 2. TEAM CARDS ===== */}
            <section className="relative z-10 py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal animation="blur-in">
                        <div className="text-center mb-14">
                            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Our Team</span>
                            <h2 className="text-3xl sm:text-5xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                The <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Minds Behind</span> Mechtron
                            </h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {TEAM_MEMBERS.map((member, i) => (
                            <TeamCard key={member.enrollment} member={member} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 3. PROJECT GUIDE ===== */}
            <section className="relative z-10 py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <ScrollReveal animation="blur-in">
                        <div className="text-center mb-10">
                            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Project Guide</span>
                            <h2 className="text-3xl sm:text-5xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                Under the <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Guidance Of</span>
                            </h2>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="scale-up" delay={0.15}>
                        <div className="relative bg-white/[0.04] backdrop-blur-md border border-cyan-500/20 rounded-3xl p-10 
              transition-all duration-500 hover:bg-white/[0.06] overflow-hidden text-center">

                            {/* Background glow */}
                            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl" />

                            {/* Avatar */}
                            <div className="flex justify-center mb-6">
                                <div
                                    className="w-28 h-28 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center 
                    text-4xl font-bold text-white shadow-xl"
                                    style={{
                                        boxShadow: '0 12px 40px rgba(34, 211, 238, 0.3)',
                                        fontFamily: 'Space Grotesk, sans-serif'
                                    }}
                                >
                                    SM
                                </div>
                            </div>

                            <h3
                                className="text-2xl sm:text-3xl font-bold text-white mb-2"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                {GUIDE.name}
                            </h3>

                            <div className="flex justify-center mb-4">
                                <span className="text-sm font-semibold px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 tracking-wide">
                                    {GUIDE.role}
                                </span>
                            </div>

                            <p className="text-gray-400 text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {GUIDE.department}
                            </p>

                            <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mx-auto mb-4" />

                            <p className="text-gray-300 text-base leading-relaxed max-w-lg mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {GUIDE.description}
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ===== 4. ABOUT THE PROJECT ===== */}
            <section className="relative z-10 py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal animation="blur-in">
                        <div className="text-center mb-12">
                            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">About The Project</span>
                            <h2 className="text-3xl sm:text-5xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                Why We Built <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Mechtron</span>
                            </h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8">
                        <ScrollReveal animation="slide-left" delay={0.1} duration={0.8}>
                            <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 h-full transition-all duration-300 hover:bg-white/[0.05]">
                                <div className="text-3xl mb-4">🎯</div>
                                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    Our Mission
                                </h3>
                                <p className="text-gray-400 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    To bridge the gap between theoretical knowledge and practical expertise in CNC and VMC
                                    manufacturing technology, by providing students with an immersive, interactive digital
                                    learning platform that complements hands-on training.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="slide-right" delay={0.2} duration={0.8}>
                            <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 h-full transition-all duration-300 hover:bg-white/[0.05]">
                                <div className="text-3xl mb-4">💡</div>
                                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    The Problem We Solve
                                </h3>
                                <p className="text-gray-400 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    Traditional CNC/VMC education relies heavily on textbooks and limited machine access.
                                    Mechtron provides interactive 3D models, AI-powered assistance, simulated control panels,
                                    and comprehensive tool references — all accessible from any device, anytime.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="slide-left" delay={0.3} duration={0.8}>
                            <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 h-full transition-all duration-300 hover:bg-white/[0.05]">
                                <div className="text-3xl mb-4">⚙️</div>
                                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    Technology Stack
                                </h3>
                                <p className="text-gray-400 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    Built with React.js for a dynamic frontend, FastAPI for a high-performance backend,
                                    interactive 3D visualization, AI chatbot integration, and responsive design that works
                                    seamlessly across desktop, tablet, and mobile devices.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="slide-right" delay={0.4} duration={0.8}>
                            <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 h-full transition-all duration-300 hover:bg-white/[0.05]">
                                <div className="text-3xl mb-4">🏫</div>
                                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    Academic Context
                                </h3>
                                <p className="text-gray-400 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    This project is developed as a final year project by students of the Mechanical
                                    Engineering department, under the guidance of Mr. S. U. Misal. It aims to modernize
                                    the way manufacturing technology is taught and learned.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ===== 5. BACK TO HOME + FOOTER ===== */}
            <section className="relative z-10 py-12 px-4">
                <ScrollReveal animation="fade-up">
                    <div className="text-center mb-12">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 
                font-semibold text-base shadow-lg shadow-cyan-500/25 transition-all duration-300 
                hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/40"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            Back to Home
                        </Link>
                    </div>
                </ScrollReveal>

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

export default AboutUs;
