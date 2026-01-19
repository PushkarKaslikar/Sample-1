import React from 'react';
import { ExternalLink } from 'lucide-react';

const Chatbot = () => {
    return (
        <div className="flex h-[calc(100vh-64px)] bg-slate-900 mt-16 overflow-hidden relative">
            <iframe
                src="https://chat.deepseek.com/"
                title="DeepSeek"
                className="w-full h-full border-0"
                allow="microphone"
            />

            {/* Fallback / Overlay Button in case the iframe is blocked */}
            <div className="absolute top-4 right-4 z-50">
                <a
                    href="https://chat.deepseek.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-white/20 shadow-lg transition-colors text-sm"
                >
                    <ExternalLink className="w-4 h-4" />
                    Open DeepSeek
                </a>
            </div>

            <div className="absolute top-4 left-4 z-40 pointer-events-none bg-black/50 p-2 rounded text-xs text-white/50">
                Note: DeepSeek may block embedding. Use button if blank.
            </div>
        </div>
    );
};

export default Chatbot;
