import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VMC_TOOLS } from './VmcTools';
import { ArrowLeft } from 'lucide-react';

function VmcToolDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const tool = VMC_TOOLS.find(t => t.id === parseInt(id));

    if (!tool) {
        return <div className="text-white text-center mt-20">Tool not found</div>;
    }

    // Placeholder video ID - replace with actual video logic later
    const videoId = "dQw4w9WgXcQ"; // Using a placeholder ID (Rick Roll essentially, or generic) for now as requested "youtube video"

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white p-6 md:p-12 overflow-y-auto">
            <div className="max-w-5xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/vmc-tools')}
                    className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to VMC Tools
                </button>

                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">

                    {/* Hero Section with Image */}
                    <div className="w-full h-[400px] relative bg-black/40">
                        <img
                            src={tool.image}
                            alt={tool.name}
                            className="w-full h-full object-contain p-8"
                        />
                    </div>

                    <div className="p-8 md:p-12 space-y-12">

                        {/* Title & Description */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                {tool.name}
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                                {tool.description}
                            </p>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}

export default VmcToolDetail;
