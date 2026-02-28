import React, { useState, useRef, useEffect } from 'react';

const VMC_SIDE_HOTSPOTS = [
    {
        id: 'automatic-tool-changer',
        title: 'Automatic Tool Changer',
        description: [
            'Stores multiple cutting tools',
            'Automatically changes tools during machining',
            'Reduces manual setup time',
            'Increases productivity'
        ],
        hotspots: [
            { x: 41.0, y: 15.0, w: 20.0, h: 22.0 }
        ],
        infoBox: { x: 80, y: 20 }
    },
    {
        id: 'coolant-pump-motor',
        title: 'Coolant Pump Motor',
        description: [
            'Circulates coolant to cutting zone',
            'Prevents overheating of tool and workpiece',
            'Improves surface finish'
        ],
        hotspots: [
            { x: 41.5, y: 72.0, w: 5.5, h: 14.0 }
        ],
        infoBox: { x: 80, y: 75 }
    },
    {
        id: 'lubrication-unit',
        title: 'Lubrication Unit',
        description: [
            'Supplies oil to guideways and ball screws',
            'Reduces friction and wear',
            'Ensures smooth axis movement'
        ],
        hotspots: [
            { x: 21.0, y: 69.0, w: 16.0, h: 24.0 }
        ],
        infoBox: { x: 10, y: 55 }
    }
];

const InteractiveVmcSideImage = () => {
    const [hoveredPart, setHoveredPart] = useState(null);
    const containerRef = useRef(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Detect touch device via media query (hover: none)
    useEffect(() => {
        const mql = window.matchMedia('(hover: none)');
        setIsTouchDevice(mql.matches);
        const handler = (e) => setIsTouchDevice(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    // Update SVG line coordinates when resizing
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setContainerSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };

        // Initial size
        updateSize();

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const handleHotspotInteraction = (partId) => {
        if (isTouchDevice) {
            setHoveredPart(prev => prev === partId ? null : partId);
        }
    };

    const activeMobilePart = isTouchDevice ? VMC_SIDE_HOTSPOTS.find(h => h.id === hoveredPart) : null;

    return (
        <div className="w-full max-w-4xl mx-auto mt-24 mb-32 relative" ref={containerRef}>
            <h3 className="text-2xl font-bold mb-6 text-center text-cyan-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                VMC Side View Explorer
            </h3>

            <div className="relative">
                {/* Base Image */}
                <img
                    src="/images/vmc_interactive_image/vmc_sideview.png"
                    alt="Interactive VMC Side View"
                    className="w-full h-auto rounded-xl shadow-2xl border border-white/10"
                    onLoad={() => {
                        if (containerRef.current) {
                            setContainerSize({
                                width: containerRef.current.offsetWidth,
                                height: containerRef.current.offsetHeight
                            });
                        }
                    }}
                />

                {/* SVG Layer for connecting lines - desktop only */}
                {!isTouchDevice && (
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none z-10"
                        style={{ overflow: 'visible' }}
                    >
                        {hoveredPart && containerSize.width > 0 && (() => {
                            const activePart = VMC_SIDE_HOTSPOTS.find(h => h.id === hoveredPart);
                            if (!activePart) return null;

                            // Compute the anchor point mapping line from the center of the hotspot rectangle 
                            const firstHotspot = activePart.hotspots[0];
                            const x1 = firstHotspot.x + (firstHotspot.w / 2);
                            const y1 = firstHotspot.y + (firstHotspot.h / 2);

                            const x2 = activePart.infoBox.x;
                            const y2 = activePart.infoBox.y;

                            return (
                                <line
                                    x1={`${x1}%`}
                                    y1={`${y1}%`}
                                    x2={`${x2}%`}
                                    y2={`${y2}%`}
                                    stroke="#22d3ee" // Cyan-400
                                    strokeWidth="2"
                                    strokeDasharray="4 4"
                                    className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300"
                                />
                            );
                        })()}
                    </svg>
                )}

                {/* Hotspots Layer */}
                {VMC_SIDE_HOTSPOTS.map((part) => (
                    <React.Fragment key={part.id}>
                        {part.hotspots.map((box, idx) => (
                            <div
                                key={`${part.id}-${idx}`}
                                className={`absolute cursor-pointer transition-all duration-300 z-20 
                                  ${hoveredPart === part.id
                                        ? 'bg-cyan-400/20 border-2 border-cyan-400 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                                        : 'bg-transparent border-2 border-transparent hover:bg-white/10 hover:border-white/30 rounded-lg'
                                    }`}
                                style={{
                                    left: `${box.x}%`,
                                    top: `${box.y}%`,
                                    width: `${box.w}%`,
                                    height: `${box.h}%`
                                }}
                                onMouseEnter={!isTouchDevice ? () => setHoveredPart(part.id) : undefined}
                                onMouseLeave={!isTouchDevice ? () => setHoveredPart(null) : undefined}
                                onClick={() => handleHotspotInteraction(part.id)}
                            />
                        ))}
                    </React.Fragment>
                ))}

                {/* Info Boxes Layer - desktop only */}
                {!isTouchDevice && VMC_SIDE_HOTSPOTS.map((part) => (
                    <div
                        key={`info-${part.id}`}
                        className={`absolute z-30 w-72 bg-[#18181b]/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-5 shadow-2xl transition-all duration-300 transform
                          ${hoveredPart === part.id
                                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                                : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
                            }`}
                        style={{
                            left: `${part.infoBox.x}%`,
                            top: `${part.infoBox.y}%`,
                            transform: 'translate(-50%, -50%)' // Center the box on the coordinate
                        }}
                    >
                        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/10">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
                            <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                {part.title}
                            </h3>
                        </div>
                        <ul className="space-y-2">
                            {part.description.map((desc, idx) => (
                                <li key={idx} className="text-sm text-gray-300 flex items-start">
                                    <span className="text-cyan-500 mr-2 mt-0.5">•</span>
                                    <span className="leading-relaxed">{desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Mobile Info Panel - shown below image on touch devices */}
            {isTouchDevice && activeMobilePart && (
                <div className="mt-4 bg-[#18181b]/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-5 shadow-2xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/10">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
                        <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {activeMobilePart.title}
                        </h3>
                    </div>
                    <ul className="space-y-2">
                        {activeMobilePart.description.map((desc, idx) => (
                            <li key={idx} className="text-sm text-gray-300 flex items-start">
                                <span className="text-cyan-500 mr-2 mt-0.5">•</span>
                                <span className="leading-relaxed">{desc}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default InteractiveVmcSideImage;
