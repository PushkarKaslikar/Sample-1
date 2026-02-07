import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AuthContext } from '../App';

function CNCControlPanel() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleBack = () => {
        if (user?.role === 'teacher') {
            navigate('/teacher-dashboard');
        } else {
            navigate('/student-dashboard');
        }
    };

    const controlFunctions = [
        { title: "Emergency Stop (E-STOP)", description: "The emergency stop button is used to immediately stop all machine operations in case of danger or emergency. It cuts power to machine movements and spindle to ensure operator safety." },
        { title: "Power ON / OFF", description: "These buttons are used to switch the CNC machine power ON or OFF. The machine must be powered ON before loading programs or operating the machine." },
        { title: "Cycle Start", description: "The cycle start button is used to start or resume the CNC program. Once pressed, the machine begins executing the programmed machining operations." },
        { title: "Feed Hold", description: "The feed hold button temporarily pauses the machine movement without stopping the spindle. It is used when the operator needs to inspect machining or make adjustments safely." },
        { title: "Spindle Start / Stop", description: "These buttons control the spindle rotation. Spindle start turns the spindle ON, while spindle stop turns it OFF. Proper spindle control is necessary for safe machining." },
        { title: "Jog Buttons (Axis Movement Keys)", description: "Jog buttons are used to manually move the machine axes (X, Y, Z) in small steps. They are mainly used for machine setup, tool positioning, and alignment." },
        { title: "Mode Selection Switch", description: "This switch is used to select machine operating modes such as: Manual Mode, Jog Mode, MDI Mode, Automatic Mode. Selecting the correct mode is essential for proper operation." },
        { title: "MDI (Manual Data Input) Key", description: "MDI mode allows the operator to enter and execute single CNC commands directly. It is useful for testing movements and setting machine positions." },
        { title: "Program Edit Keys", description: "These keys are used to create, edit, or modify CNC programs. Operators can input G codes and M codes using the keypad." },
        { title: "Numeric & Alphanumeric Keypad", description: "The keypad is used to enter program numbers, coordinates, feed rates, spindle speeds, and commands. It functions like a keyboard for CNC programming." },
        { title: "Override Knobs (Feed / Spindle Override)", description: "Override knobs are used to increase or decrease feed rate and spindle speed during machining. This helps control cutting conditions without stopping the machine." },
        { title: "Reset Button", description: "The reset button clears alarms, stops program execution, and resets the control system to a safe state." },
        { title: "Status Display Screen", description: "The screen displays machine coordinates, program status, alarms, tool offsets, and machining parameters. It helps the operator monitor and control the machining process." },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white p-8 overflow-y-auto">
            <div className="container mx-auto max-w-6xl">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>

                {/* Header */}
                <h1
                    className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    CNC CONTROL PANEL – BUTTONS & FUNCTIONS
                </h1>

                {/* 3D Model Section */}
                <div className="mb-12 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm overflow-hidden shadow-2xl">
                    <div className="sketchfab-embed-wrapper w-full h-[500px]">
                        <iframe
                            title="CNC Control Panel"
                            frameBorder="0"
                            allowFullScreen
                            mozallowfullscreen="true"
                            webkitallowfullscreen="true"
                            allow="autoplay; fullscreen; xr-spatial-tracking"
                            xr-spatial-tracking
                            execution-while-out-of-viewport
                            execution-while-not-rendered
                            web-share
                            src="https://sketchfab.com/models/3baed9ac58184563812f896612a45dc0/embed"
                            className="w-full h-full rounded-xl"
                        >
                        </iframe>
                    </div>

                    <p className="text-center mt-4 text-sm text-gray-400">
                        <a href="https://sketchfab.com/3d-models/cnc-control-panel-3baed9ac58184563812f896612a45dc0?utm_medium=embed&utm_campaign=share-popup&utm_content=3baed9ac58184563812f896612a45dc0" target="_blank" rel="nofollow" className="font-bold text-cyan-400 hover:text-cyan-300"> CNC Control Panel </a>
                        by <a href="https://sketchfab.com/HPrendering?utm_medium=embed&utm_campaign=share-popup&utm_content=3baed9ac58184563812f896612a45dc0" target="_blank" rel="nofollow" className="font-bold text-cyan-400 hover:text-cyan-300"> Vinny Passmore </a>
                        on <a href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=3baed9ac58184563812f896612a45dc0" target="_blank" rel="nofollow" className="font-bold text-cyan-400 hover:text-cyan-300">Sketchfab</a>
                    </p>
                </div>

                {/* Functions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {controlFunctions.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1 group"
                        >
                            <h3 className="text-xl font-bold mb-3 text-orange-400 group-hover:text-orange-300 transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                {item.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-sm">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default CNCControlPanel;
