import React, { useState, useRef, useEffect } from 'react';

const PANEL_HOTSPOTS = [
    {
        id: 'display-screen',
        title: 'Display Screen (HMI Monitor)',
        description: [
            'Shows program, coordinates and alarms',
            'Displays spindle speed and feed rate',
            'Used to monitor machining process'
        ],
        hotspot: { x: 15, y: 10, w: 40, h: 40 },
        infoBox: { x: 0, y: 10 }
    },
    {
        id: 'soft-keys',
        title: 'Soft Keys',
        description: [
            'Used for menu navigation',
            'Functions change based on screen',
            'Context-sensitive controls'
        ],
        hotspot: { x: 58, y: 10, w: 5, h: 40 },
        infoBox: { x: 40, y: 5 }
    },
    {
        id: 'keypad',
        title: 'Alphanumeric Keypad',
        description: [
            'Used to enter G-code and M-code',
            'Used for manual data input (MDI)',
            'Program editing operations'
        ],
        hotspot: { x: 63, y: 5, w: 32, h: 38 },
        infoBox: { x: 110, y: 15 }
    },
    {
        id: 'e-stop',
        title: 'Emergency Stop Button',
        description: [
            'Instantly stops machine operation',
            'Cuts power to spindle and feed',
            'Used during unsafe condition'
        ],
        hotspot: { x: 4, y: 66, w: 15, h: 21 },
        infoBox: { x: -10, y: 58 }
    },
    {
        id: 'function-buttons',
        title: 'Function Buttons',
        description: [
            'Select AUTO / MDI / JOG mode',
            'Start / Stop program execution',
            'Reset machine alarms',
            'Manual axis movement control'
        ],
        hotspot: { x: 21, y: 66, w: 43, h: 29.5 },
        infoBox: { x: 38, y: 35 }
    },
    {
        id: 'feed-override',
        title: 'Feed Override Knob',
        description: [
            'Adjust feed rate percentage',
            'Fine control during machining'
        ],
        hotspot: { x: 66, y: 67, w: 14, h: 19.5 },
        infoBox: { x: 62, y: 100 }
    },
    {
        id: 'spindle-override',
        title: 'Spindle Override Knob',
        description: [
            'Adjust spindle speed manually',
            'Used for testing and setup'
        ],
        hotspot: { x: 80.7, y: 67, w: 14, h: 19.5 },
        infoBox: { x: 95, y: 100 }
    }
];

const InteractiveCncControlPanelImage = () => {
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

    useEffect(() => {
        const updateSize = () => {
            if (imageWrapperRef.current) {
                setContainerSize({
                    width: imageWrapperRef.current.offsetWidth,
                    height: imageWrapperRef.current.offsetHeight
                });
            }
        };

        updateSize();

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const handleHotspotInteraction = (partId) => {
        if (isTouchDevice) {
            setHoveredPart(prev => prev === partId ? null : partId);
        }
    };

    const activeMobilePart = isTouchDevice ? PANEL_HOTSPOTS.find(h => h.id === hoveredPart) : null;

    return (
        <div className="w-full max-w-4xl mx-auto mt-12 mb-32">
            {/* Title */}
            <div className="text-center mb-8">
                <h2
                    className="text-4xl font-extrabold mb-2 uppercase text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    Control Panel
                </h2>
                <p className="text-gray-400">
                    {isTouchDevice
                        ? 'Tap on the highlighted areas to learn about their functions'
                        : 'Hover over the highlighted areas to learn about their functions'
                    }
                </p>
            </div>

            {/* Image wrapper - this is the relative parent for hotspots */}
            <div className="relative" ref={imageWrapperRef}>
                {/* Base Image */}
                <img
                    src="/images/cnc_control_panel_interactive_image/cnc_C_panel_img.png"
                    alt="Interactive CNC Control Panel"
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
                            const activePart = PANEL_HOTSPOTS.find(h => h.id === hoveredPart);
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
                                    stroke="#f97316"
                                    strokeWidth="2"
                                    strokeDasharray="4 4"
                                    className="drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-300"
                                />
                            );
                        })()}
                    </svg>
                )}

                {/* Hotspots Layer */}
                {PANEL_HOTSPOTS.map((part) => (
                    <div
                        key={part.id}
                        className={`absolute cursor-pointer transition-all duration-300 z-20 
                          ${hoveredPart === part.id
                                ? 'bg-orange-400/20 border-2 border-orange-400 rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.5)]'
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
                {!isTouchDevice && PANEL_HOTSPOTS.map((part) => (
                    <div
                        key={`info-${part.id}`}
                        className={`absolute z-30 w-72 bg-[#18181b]/90 backdrop-blur-md border border-orange-500/30 rounded-xl p-5 shadow-2xl transition-all duration-300 transform
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
                            <div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse" />
                            <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                {part.title}
                            </h3>
                        </div>
                        <ul className="space-y-2">
                            {part.description.map((desc, idx) => (
                                <li key={idx} className="text-sm text-gray-300 flex items-start">
                                    <span className="text-orange-500 mr-2 mt-0.5">•</span>
                                    <span className="leading-relaxed">{desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Mobile Info Panel - shown below image on touch devices */}
            {isTouchDevice && activeMobilePart && (
                <div className="mt-4 bg-[#18181b]/90 backdrop-blur-md border border-orange-500/30 rounded-xl p-5 shadow-2xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/10">
                        <div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse" />
                        <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {activeMobilePart.title}
                        </h3>
                    </div>
                    <ul className="space-y-2">
                        {activeMobilePart.description.map((desc, idx) => (
                            <li key={idx} className="text-sm text-gray-300 flex items-start">
                                <span className="text-orange-500 mr-2 mt-0.5">•</span>
                                <span className="leading-relaxed">{desc}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default InteractiveCncControlPanelImage;
