import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AuthContext } from '../App';

const TOOLS = [
    {
        id: 1,
        name: "Calipers",
        image: "https://placehold.co/600x400/png?text=Calipers", // Placeholder
        description: "A precision instrument used to measure physical dimensions, often inside, outside, or depth."
    },
    {
        id: 2,
        name: "Micrometer",
        image: "https://placehold.co/600x400/png?text=Micrometer", // Placeholder
        description: "A device incorporating a calibrated screw widely used for accurate measurement of components."
    },
    {
        id: 3,
        name: "Dial Indicator",
        image: "https://placehold.co/600x400/png?text=Dial+Indicator", // Placeholder
        description: "An instrument used to measure small linear distances and check parts for runout."
    },
    {
        id: 4,
        name: "Vernier Height Gauge",
        image: "https://placehold.co/600x400/png?text=Height+Gauge", // Placeholder
        description: "Used to measure vertical distance and mark out locations on a workpiece."
    }
];

function Tools() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleBack = () => {
        if (user?.role === 'teacher') {
            navigate('/teacher-dashboard');
        } else {
            navigate('/student-dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white p-8 overflow-y-auto">
            <div className="container mx-auto">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>
                <h1 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Engineering Tools
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TOOLS.map((tool) => (
                        <div
                            key={tool.id}
                            onClick={() => navigate(`/tools/${tool.id}`)}
                            className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden bg-black/20">
                                <img
                                    src={tool.image}
                                    alt={tool.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-cyan-400 font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        View Details
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2 text-cyan-100 group-hover:text-cyan-400 transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    {tool.name}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                                    {tool.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tools;
export { TOOLS };
