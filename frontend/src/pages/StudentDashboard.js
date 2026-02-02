import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext, API } from '../App';
import { toast } from 'sonner';
import Logo from '../components/Logo';

function StudentDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data fetch since the display elements are removed
    setDashboardData({ message: "Welcome to your centralized hub for learning resources." });
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const openGemini = () => {
    window.open('https://mech-chatbot-7m1g.vercel.app/', '_self');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0b] via-[#111113] to-[#0a0a0b] text-white">
      {/* Header */}
      <nav
        data-testid="dashboard-nav"
        className="bg-black/20 backdrop-blur-xl border-b border-white/10"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Logo className="w-10 h-10" />
              <span
                className="text-xl font-bold"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Mechtron
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <span
                data-testid="user-name"
                className="text-gray-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {user?.name}
              </span>
              <button
                data-testid="logout-btn"
                onClick={handleLogout}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className="container mx-auto px-4 py-12 flex flex-col items-center justify-center"
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        <div className="text-center mb-12">
          <h1
            data-testid="dashboard-title"
            className="text-5xl font-bold mb-2"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Student Dashboard
          </h1>
          <p
            className="text-gray-400 text-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {dashboardData?.message}
          </p>
        </div>

        {/* Interactive Action Buttons */}
        {/* Interactive Action Buttons - Updated grid for 4 items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">


          {/* Chatbot Button */}
          <button
            onClick={() => navigate('/chatbot')}
            className="group flex flex-col items-center justify-center space-y-4 p-8 bg-white/5 rounded-2xl border border-white/10 transition-all duration-300 ease-in-out h-64 hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-400 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-2xl font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Chatbot
            </span>
          </button>

          {/* CNC 3D Model Button (Renamed from 3D Models) */}
          <button
            onClick={() => navigate('/lathe-3d')}
            className="group flex flex-col items-center justify-center space-y-4 p-8 bg-white/5 rounded-2xl border border-white/10 transition-all duration-300 ease-in-out h-64 hover:border-purple-400 hover:bg-purple-500/10 hover:shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-400 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span className="text-2xl font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              CNC 3D Model
            </span>
          </button>

          {/* VMC 3D Model Button (New) */}
          <button
            onClick={() => navigate('/vmc-3d')}
            className="group flex flex-col items-center justify-center space-y-4 p-8 bg-white/5 rounded-2xl border border-white/10 transition-all duration-300 ease-in-out h-64 hover:border-pink-400 hover:bg-pink-500/10 hover:shadow-2xl hover:shadow-pink-500/20 transform hover:-translate-y-2"
          >
            {/* Cog Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-pink-400 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-2xl font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              VMC 3D Model
            </span>
          </button>

          {/* Uploaded Files Button */}
          <button
            onClick={() => navigate('/student-files')}
            className="group flex flex-col items-center justify-center space-y-4 p-8 bg-white/5 rounded-2xl border border-white/10 transition-all duration-300 ease-in-out h-64 hover:border-green-400 hover:bg-green-500/10 hover:shadow-2xl hover:shadow-green-500/20 transform hover:-translate-y-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-400 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span className="text-2xl font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              My Files
            </span>
          </button>

          {/* VMC Tools Button (New) */}
          <button
            onClick={() => navigate('/vmc-tools')}
            className="group flex flex-col items-center justify-center space-y-4 p-8 bg-white/5 rounded-2xl border border-white/10 transition-all duration-300 ease-in-out h-64 hover:border-teal-400 hover:bg-teal-500/10 hover:shadow-2xl hover:shadow-teal-500/20 transform hover:-translate-y-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-teal-400 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-2xl font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              VMC Tools
            </span>
          </button>

          {/* Tools Button (Moved and Styled) */}
          <button
            onClick={() => navigate('/tools')}
            className="group flex flex-col items-center justify-center space-y-4 p-8 bg-white/5 rounded-2xl border border-white/10 transition-all duration-300 ease-in-out h-64 hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-2"
          >
            {/* Wrench Compass Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-400 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
            <span className="text-2xl font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              CNC Tools
            </span>
          </button>



        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
