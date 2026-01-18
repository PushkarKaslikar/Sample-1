import React, { useState } from 'react';

const LATHE_COMPONENTS = [
    {
        id: 1,
        name: "Control Panel",
        description: "The control panel is the main controlling unit of the VMC machine. It is used to input programs, control spindle speed, Feed rate, Tool movements and monitor machine status. The control panel displays coordinates and machining parameters. It plays a important role in automation and accurate control of machine operation.",
        image: "./images/vmc_control_panel.png"
    },
    {
        id: 2,
        name: "Spindle",
        description: "The spindle is a rotating components that holds and drives the cutting tool. In a VMC, the spindle is vertically oriented and rotates at high speed to perform operations such as milling, drilling and tapping. The spindle speed directly affects cutting performance, accuracy and surface finish.",
        image: "./images/vmc_spindle.png"
    },
    {
        id: 3,
        name: "Tool Magazine / Automatic Tool Changer (ACT)",
        description: "The Tool magazine stores multiple cutting tools and automatically changes them during machining as per the CNC program. The Automatic tool changer reduces manual intervention and machine time. It increases productivity by enabling multiple operation in a single setup.",
        image: "./images/ACT.png"
    },
    {
        id: 4,
        name: "Machine Table",
        description: "The machine table is used to mount and hold the workpiece securely using fixtures or clamps.it moves along the X and Y axes to position the workpiece accurately under the cutting tool. Proper clamping on the table ensures machining accuracy and safety of the operator.",
        image: "./images/machine_table.png"
    },
    {
        id: 5,
        name: "Column",
        description: "The Column is the vertical structural component that supports the spindle head. It is Rigid and aligned for vertical movements along the Z axis. A strong column is essential to reduce the vibration during the operation and maintain the machining accuracy.",
        image: "./images/column.png"
    },
    {
        id: 6,
        name: "Bed / Base",
        description: "The Base (Bed) is the foundation of the VMC machine. It supports all the major/minor components such as column, table and spindle assembly. The base provide rigid and strong support also absorbs vibrations generated during machining, maintaining stability.",
        image: "./images/bed.png"
    },
    {
        id: 7,
        name: "Coolant System",
        description: "Coolant system is the one of the most important component in VMC machines. It supply coolant to cutting zone to reduce heat, improve surface finish and extend tool life reducing the extra wear of tools. It also help in flushing away the cheap generated during machining operations.",
        image: "./images/coolant.png"
    },
    {
        id: 8,
        name: "Linear Guideways",
        description: "Linear guideways provide smooth and accurate coordinated movement of the table saddle and spindle head along the different axis. They reduce the friction and improves the precision positioning, which is critical for high-accuracy machining.",
        image: "./images/linear_guideways.png"
    },
    {
        id: 9,
        name: "Safety Enclosure",
        description: "The safety enclosure surrounds the machining area and protects the operator from flying chip material formed during operations also rotating tools and coolant splashes. It ensures safe operation.",
        image: "./images/vmc_safety_enclosure.png"
    }
];

const FLOW_STEPS = [
    "Start / Power ON machine",
    "Load CNC program (G-code)",
    "Workpiece clamped in chuck",
    "Tool selected from tool turret",
    "Set spindle speed & feed rate",
    "Tool moves as per program",
    "Machining operation performed",
    "Machine stops / End"
];

const DOS = [
    {
        title: "Proper Fixture Clamping",
        description: "Ensure proper fixture clamping on the machine table."
    },
    {
        title: "Check Tool Length Offset",
        description: "Check tool length offset (Z-offset) before machining."
    },
    {
        title: "Confirm Tool Magazine/ATC",
        description: "Confirm tool magazine and ATC operation."
    },
    {
        title: "Remove Measuring Tools",
        description: "Remove all measuring tools from the table before cycle start."
    },
    {
        title: "Correct Coolant Direction",
        description: "Use correct coolant direction for vertical cutting."
    }
];

const DONTS = [
    {
        title: "Hands Inside Machine",
        description: "Do not place hands inside the machine during tool change."
    },
    {
        title: "Limits",
        description: "Do not exceed tool length or spindle load limits."
    },
    {
        title: "Loose Items",
        description: "Do not leave loose bolts or fixtures on the table."
    },
    {
        title: "Safety Interlocks",
        description: "Do not bypass door interlocks."
    },
    {
        title: "Work Offset",
        description: "Do not run program without setting work offset."
    }
];

function Vmc3dModel() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const closeVal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white overflow-y-auto">
            <div className="container mx-auto px-4 py-8">

                {/* 3D Model Section */}
                <div className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Interactive 3D Model
                    </h2>
                    <div className="sketchfab-embed-wrapper">
                        <iframe
                            title="CAMPRO Vertical Machining Center NV-1280"
                            frameBorder="0"
                            allowFullScreen
                            mozallowfullscreen="true"
                            webkitallowfullscreen="true"
                            allow="autoplay; fullscreen; xr-spatial-tracking"
                            execution-while-out-of-viewport="true"
                            execution-while-not-rendered="true"
                            web-share="true"
                            src="https://sketchfab.com/models/d11b572b74bd4d148ac8980294d9a2fa/embed"
                            className="w-full h-[500px] md:h-[600px] rounded-xl border-none"
                        />
                        <p className="text-center text-sm text-gray-400 mt-4">
                            <a
                                href="https://sketchfab.com/3d-models/campro-vertical-machining-center-nv-1280-d11b572b74bd4d148ac8980294d9a2fa?utm_medium=embed&utm_campaign=share-popup&utm_content=d11b572b74bd4d148ac8980294d9a2fa"
                                target="_blank"
                                rel="noreferrer"
                                className="text-cyan-400 font-semibold hover:underline"
                            >
                                CAMPRO Vertical Machining Center NV-1280
                            </a> by <a href="https://sketchfab.com/strategicsale.four?utm_medium=embed&utm_campaign=share-popup&utm_content=d11b572b74bd4d148ac8980294d9a2fa" target="_blank" rel="noreferrer" className="text-cyan-400 font-semibold hover:underline">strategicsale.four</a>
                        </p>
                    </div>
                </div>

                {/* Components Section */}
                <div className="mb-12">
                    <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Machine Components
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {LATHE_COMPONENTS.map((component) => (
                            <div
                                key={component.id}
                                className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20"
                            >
                                {/* Image Container */}
                                <div
                                    className="relative h-80 overflow-hidden bg-black/20 cursor-pointer"
                                    onClick={() => handleImageClick(component.image)}
                                >
                                    <img
                                        src={component.image}
                                        alt={component.name}
                                        className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-cyan-400 font-bold text-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                            Click to Enlarge
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-xl font-bold mb-2 text-cyan-100 group-hover:text-cyan-400 transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                        {component.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {component.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step by Step Flow Section */}
                <div className="mb-12">
                    <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Step by Step Flow
                    </h2>

                    <div className="max-w-2xl mx-auto">
                        {FLOW_STEPS.map((step, index) => (
                            <div key={index} className="flex flex-col items-center">
                                {/* Step Box */}
                                <div
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 group cursor-default"
                                >
                                    <span className="text-xl font-bold text-cyan-100 group-hover:text-cyan-400 transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                        {step}
                                    </span>
                                </div>

                                {/* Arrow Connector (show for all except last item) */}
                                {index < FLOW_STEPS.length - 1 && (
                                    <div className="h-12 w-px bg-gradient-to-b from-white/20 to-cyan-400/50 my-2 relative">
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                                            <svg
                                                className="w-4 h-4 text-cyan-400/50"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dos and Donts Section */}
                <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* DOS Section */}
                    <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6 md:p-8">
                        <h2 className="text-3xl font-bold mb-8 text-center text-green-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            DOs of VMC Machine
                        </h2>
                        <div className="space-y-6">
                            {DOS.map((item, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-green-100 mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                            {item.title}
                                        </h3>
                                        <p className="text-green-200/70 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* DONTS Section */}
                    <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 md:p-8">
                        <h2 className="text-3xl font-bold mb-8 text-center text-red-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            DON'Ts of VMC Machine
                        </h2>
                        <div className="space-y-6">
                            {DONTS.map((item, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-red-100 mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                            {item.title}
                                        </h3>
                                        <p className="text-red-200/70 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 transition-opacity duration-300"
                    onClick={closeVal}
                >
                    <div className="relative max-w-7xl w-full max-h-screen flex items-center justify-center">
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition-colors"
                            onClick={closeVal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img
                            src={selectedImage}
                            alt="Full size"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Vmc3dModel;
