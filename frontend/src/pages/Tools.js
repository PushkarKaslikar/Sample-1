import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AuthContext } from '../App';
import ChatbotBackground from '../components/ChatbotBackground';

const TOOLS = [
    {
        id: 1,
        name: "Parting (Cut-off) Tool",
        image: "../images/cnc_tools/parting_tool.png", // Placeholder
        description: "The indexable turning tool is used for external turning operations on cylindrical workpieces. It removes material along the length of the rotating part. The replaceable carbide insert improves cutting performance, accuracy, and tool life, making it suitable for automated CNC machining."
    },
    {
        id: 2,
        name: "Facing Tool",
        image: "../images/cnc_tools/facing_tool.png", // Placeholder
        description: "The facing tool is used in CNC lathe machines to create a flat and smooth surface at the end of a rotating workpiece. It moves perpendicular to the axis of rotation and removes excess material. Facing is usually the first machining operation and ensures accurate length and proper surface finish."
    },
    {
        id: 3,
        name: "Indexable turning tool",
        image: "../images/cnc_tools/indexable_turning_tool.png", // Placeholder
        description: "The indexable turning tool is used for external turning operations on cylindrical workpieces. It removes material along the length of the rotating part. The replaceable carbide insert improves cutting performance, accuracy, and tool life, making it suitable for automated CNC machining."
    },
    {
        id: 4,
        name: "Boring Bar",
        image: "../images/cnc_tools/boring_bar.png", // Placeholder
        description: "The boring bar is used for internal machining operations. It enlarges and finishes existing holes with high accuracy. Boring improves hole diameter, alignment, and surface finish, making it important for precision components in CNC machining."
    },
    {
        id: 5,
        name: "Drill Bit (Lathe Drilling Tool)",
        image: "../images/cnc_tools/drill_bit.png", // Placeholder
        description: "The drill bit is used to create round holes in the workpiece. In CNC lathes, it is commonly mounted on the tool turret. Drilling is a basic machining operation required for assembly and further internal machining processes."
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
        <div className="min-h-screen text-white p-8 overflow-y-auto relative z-0">
            <ChatbotBackground />
            <div className="container mx-auto">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>
                <h1 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    CNC Tools
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
