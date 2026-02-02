import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AuthContext } from '../App';

const VMC_TOOLS = [
    {
        id: 1,
        name: "End Mill",
        image: "../images/vmc_tools/end_mill.png", // Placeholder
        description: "The end mill is a cutting tool used in VMC machines for slotting, pocketing, profiling, and surface machining. It has cutting edges on the sides and tip, allowing material removal in multiple directions. End mills are widely used for complex shape machining."
    },
    {
        id: 2,
        name: "Face Milling Cutter",
        image: "../images/vmc_tools/face_milling_cutter.png", // Placeholder
        description: "The face milling cutter is used to machine large flat surfaces. It removes material using multiple cutting inserts and provides good surface finish. Face milling is commonly used for preparing reference surfaces in VMC machining."
    },
    {
        id: 3,
        name: "Drill Bit",
        image: "../images/vmc_tools/drill_bit.png", // Placeholder
        description: "The drill bit in VMC machines is used to create precise holes in the workpiece. It is essential for operations such as fastening, tapping preparation, and assembly. Drilling is one of the most frequently used operations in milling machines."
    },
    {
        id: 4,
        name: "Boring Tool",
        image: "../images/vmc_tools/boring_tool.png", // Placeholder
        description: "The boring tool in a VMC is used to enlarge and accurately finish drilled holes. It improves dimensional accuracy and surface quality. Boring is preferred when high precision and tight tolerances are required."
    },
    {
        id: 5,
        name: "Tapping Tool",
        image: "../images/vmc_tools/tapping_tool.png", // Placeholder
        description: "The tapping tool is used to create internal threads inside drilled holes. It allows bolts and screws to be fitted accurately. Tapping tools are essential for threaded components in mechanical assemblies."
    }
];

function VmcTools() {
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
                    VMC Tools
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {VMC_TOOLS.map((tool) => (
                        <div
                            key={tool.id}
                            onClick={() => navigate(`/vmc-tools/${tool.id}`)}
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

export default VmcTools;
export { VMC_TOOLS };
