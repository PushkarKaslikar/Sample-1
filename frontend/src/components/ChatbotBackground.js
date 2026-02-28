import React from 'react';

const ChatbotBackground = () => {
    return (
        <>
            <div className="fixed inset-0 bg-slate-900 pointer-events-none -z-10" />
            <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-black pointer-events-none -z-10" />
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none mix-blend-screen animate-pulse -z-10" />
            <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none mix-blend-screen animate-pulse -z-10" />
        </>
    );
};

export default ChatbotBackground;
