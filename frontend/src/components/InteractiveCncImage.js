import React, { useState, useRef, useEffect } from 'react';

const CNC_HOTSPOTS = [
    {
        id: 'control-panel',
        title: 'Control Panel (CNC Controller)',
        description: [
            'Used to input and edit CNC programs',
            'Selects manual or automatic mode',
            'Interface between operator and machine'
        ],
        // Approximate percentages (we will refine these using the browser tool)
        hotspot: { x: 54.0, y: 19.5, w: 23.0, h: 32.0 },
        infoBox: { x: 16, y: 15 }
    },
    {
        id: 'safety-enclosure',
        title: 'Safety Enclosure (Machine Body)',
        description: [
            'Prevents flying chips and coolant splash',
            'Contains high-speed rotating parts safely',
            'Improves workplace safety standards'
        ],
        hotspot: { x: 75.0, y: 19.5, w: 16.0, h: 42.0 },
        infoBox: { x: 101, y: 5 }
    },
    // {
    //     id: 'chuck',
    //     title: 'Chuck',
    //     description: [
    //         'Holds and clamps the workpiece',
    //         'Rotates the material at high speed',
    //         'Ensures firm grip during machining'
    //     ],
    //     hotspot: { x: 41.0, y: 35.0, w: 6.0, h: 14.0 },
    //     infoBox: { x: 16, y: 65 }
    // },
    {
        id: 'spindle',
        title: 'Chuck',
        description: [
            'Holds and clamps the workpiece',
            'Rotates the material at high speed',
            'Ensures firm grip during machining'
        ],
        hotspot: { x: 36.0, y: 35.0, w: 5.0, h: 14.0 },
        infoBox: { x: 16, y: 40 }
    },
    {
        id: 'bed',
        title: 'Bed',
        description: [
            'Base foundation of the machine',
            'Provides rigidity and structural strength',
            'Absorbs vibration during operation',
            'Maintains machine alignment'
        ],
        hotspot: { x: 11.5, y: 79.5, w: 73.5, h: 16.0 },
        infoBox: { x: 90, y: 50 }
    },
    {
        id: 'carriage',
        title: 'Carriage',
        description: [
            'Moves cutting tool along the workpiece',
            'Controls longitudinal and cross movement',
            'Provides precise tool positioning',
            'Driven by lead screw or servo motor'
        ],
        hotspot: { x: 34.0, y: 50.0, w: 23.0, h: 19.0 },
        infoBox: { x: 84, y: 68 }
    }
];

const InteractiveCncImage = () => {
    const [hoveredPart, setHoveredPart] = useState(null);
    const imageWrapperRef = useRef(null);
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
            if (imageWrapperRef.current) {
                setContainerSize({
                    width: imageWrapperRef.current.offsetWidth,
                    height: imageWrapperRef.current.offsetHeight
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

    const activeMobilePart = isTouchDevice ? CNC_HOTSPOTS.find(h => h.id === hoveredPart) : null;

    return (
        <div className="w-full max-w-6xl mx-auto mt-12 mb-32">
            {/* Image + hotspots wrapper - isolated relative container */}
            <div className="relative" ref={imageWrapperRef}>
                {/* Base Image */}
                <img
                    src="/images/cnc_interactive_image/cnc_image_interactive.png"
                    alt="Interactive CNC Machine"
                    className="w-full h-auto rounded-xl shadow-2xl border border-white/10"
                    onLoad={() => {
                        if (imageWrapperRef.current) {
                            setContainerSize({
                                width: imageWrapperRef.current.offsetWidth,
                                height: imageWrapperRef.current.offsetHeight
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
                            const activePart = CNC_HOTSPOTS.find(h => h.id === hoveredPart);
                            if (!activePart) return null;

                            const x1 = activePart.hotspot.x + (activePart.hotspot.w / 2);
                            const y1 = activePart.hotspot.y + (activePart.hotspot.h / 2);
                            const x2 = activePart.infoBox.x;
                            const y2 = activePart.infoBox.y;

                            return (
                                <line
                                    x1={`${x1}%`}
                                    y1={`${y1}%`}
                                    x2={`${x2}%`}
                                    y2={`${y2}%`}
                                    stroke="#22d3ee"
                                    strokeWidth="2"
                                    strokeDasharray="4 4"
                                    className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300"
                                />
                            );
                        })()}
                    </svg>
                )}

                {/* Hotspots Layer */}
                {CNC_HOTSPOTS.map((part) => (
                    <div
                        key={part.id}
                        className={`absolute cursor-pointer transition-all duration-300 z-20 
                          ${hoveredPart === part.id
                                ? 'bg-cyan-400/20 border-2 border-cyan-400 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                                : 'bg-transparent border-2 border-transparent hover:bg-white/10 hover:border-white/30 rounded-lg'
                            }`}
                        style={{
                            left: `${part.hotspot.x}%`,
                            top: `${part.hotspot.y}%`,
                            width: `${part.hotspot.w}%`,
                            height: `${part.hotspot.h}%`
                        }}
                        onMouseEnter={!isTouchDevice ? () => setHoveredPart(part.id) : undefined}
                        onMouseLeave={!isTouchDevice ? () => setHoveredPart(null) : undefined}
                        onClick={() => handleHotspotInteraction(part.id)}
                    />
                ))}

                {/* Info Boxes Layer - desktop only */}
                {!isTouchDevice && CNC_HOTSPOTS.map((part) => (
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
                            transform: 'translate(-50%, -50%)'
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

            {/* Mobile Info Panel - OUTSIDE the relative container */}
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

export default InteractiveCncImage;
