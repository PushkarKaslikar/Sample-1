import React from 'react';
import { ExternalLink } from 'lucide-react';

const Chatbot = () => {
    return (
        <div className="flex h-[calc(100vh-64px)] bg-slate-900 mt-16 overflow-hidden relative">
            {/* Embed the Standalone Chatbot Project */}
            <iframe
                src="https://sample-1-eafr.vercel.app/"
                title="Mech Chatbot"
                className="w-full h-full border-0"
                allow="microphone; clipboard-read; clipboard-write"
            />

        </div>
    );
};

export default Chatbot;
