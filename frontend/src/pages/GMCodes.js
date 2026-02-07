import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AuthContext } from '../App';

function GMCodes() {
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
            <div className="container mx-auto max-w-5xl">
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
                    className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    G Codes and M Codes in CNC Machines
                </h1>

                {/* Introduction */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 backdrop-blur-sm">
                    <p className="text-gray-300 text-lg leading-relaxed">
                        G codes and M codes are standard programming commands used in CNC machines.
                        <strong className="text-lime-400"> G codes</strong> control the movement and machining operations, while
                        <strong className="text-orange-400"> M codes</strong> control machine functions such as spindle ON/OFF, coolant, and program control.
                        These codes allow accurate and automated operation of CNC and VMC machines.
                    </p>
                </div>

                {/* G CODES SECTION */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-lime-400 flex items-center gap-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        <span className="w-2 h-8 bg-lime-400 rounded-full"></span>
                        G CODES SECTION
                    </h2>
                    <p className="text-gray-300 mb-6 text-lg">
                        G codes are used to control tool movement, positioning, and machining operations in CNC machines. They define how the machine moves and performs cutting.
                    </p>

                    <div className="overflow-x-auto rounded-xl border border-white/10">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/10 text-lime-400">
                                    <th className="p-4 border-b border-white/10 font-bold">G Code</th>
                                    <th className="p-4 border-b border-white/10 font-bold">Function</th>
                                    <th className="p-4 border-b border-white/10 font-bold">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-gray-300">
                                {[
                                    { code: 'G00', func: 'Rapid Positioning', desc: 'Moves tool quickly without cutting' },
                                    { code: 'G01', func: 'Linear Interpolation', desc: 'Straight cutting movement' },
                                    { code: 'G02', func: 'Circular Interpolation (CW)', desc: 'Clockwise circular cutting' },
                                    { code: 'G03', func: 'Circular Interpolation (CCW)', desc: 'Counter-clockwise circular cutting' },
                                    { code: 'G04', func: 'Dwell', desc: 'Pause for a specified time' },
                                    { code: 'G20', func: 'Inch Mode', desc: 'Programming in inches' },
                                    { code: 'G21', func: 'Metric Mode', desc: 'Programming in millimeters' },
                                    { code: 'G28', func: 'Return to Home', desc: 'Moves machine to reference position' },
                                    { code: 'G90', func: 'Absolute Programming', desc: 'Coordinates from origin' },
                                    { code: 'G91', func: 'Incremental Programming', desc: 'Coordinates from current position' },
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-mono text-lime-300">{row.code}</td>
                                        <td className="p-4 font-semibold">{row.func}</td>
                                        <td className="p-4">{row.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* M CODES SECTION */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-orange-400 flex items-center gap-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        <span className="w-2 h-8 bg-orange-400 rounded-full"></span>
                        M CODES SECTION
                    </h2>
                    <p className="text-gray-300 mb-6 text-lg">
                        M codes control machine-related functions such as spindle operation, coolant flow, and program execution. They manage the auxiliary functions of the CNC machine.
                    </p>

                    <div className="overflow-x-auto rounded-xl border border-white/10">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/10 text-orange-400">
                                    <th className="p-4 border-b border-white/10 font-bold">M Code</th>
                                    <th className="p-4 border-b border-white/10 font-bold">Function</th>
                                    <th className="p-4 border-b border-white/10 font-bold">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-gray-300">
                                {[
                                    { code: 'M00', func: 'Program Stop', desc: 'Stops program execution' },
                                    { code: 'M01', func: 'Optional Stop', desc: 'Stops program if enabled' },
                                    { code: 'M02', func: 'End of Program', desc: 'Ends program' },
                                    { code: 'M03', func: 'Spindle ON (CW)', desc: 'Starts spindle clockwise' },
                                    { code: 'M04', func: 'Spindle ON (CCW)', desc: 'Starts spindle counter-clockwise' },
                                    { code: 'M05', func: 'Spindle OFF', desc: 'Stops spindle' },
                                    { code: 'M06', func: 'Tool Change', desc: 'Changes tool automatically' },
                                    { code: 'M08', func: 'Coolant ON', desc: 'Turns coolant ON' },
                                    { code: 'M09', func: 'Coolant OFF', desc: 'Turns coolant OFF' },
                                    { code: 'M30', func: 'Program End & Reset', desc: 'Ends program and resets' },
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-mono text-orange-300">{row.code}</td>
                                        <td className="p-4 font-semibold">{row.func}</td>
                                        <td className="p-4">{row.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Difference Table */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-white text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Difference Between G Code and M Code
                    </h2>
                    <div className="overflow-x-auto rounded-xl border border-white/10 shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-r from-lime-900/40 to-orange-900/40 text-white">
                                    <th className="p-4 border-b border-white/10 w-1/2 font-bold text-center text-lime-400 text-xl">G Code</th>
                                    <th className="p-4 border-b border-white/10 w-1/2 font-bold text-center text-orange-400 text-xl">M Code</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-gray-300">
                                <tr className="hover:bg-white/5">
                                    <td className="p-6 border-r border-white/10 text-center">Controls <span className="text-lime-300 font-semibold">tool movement</span></td>
                                    <td className="p-6 text-center">Controls <span className="text-orange-300 font-semibold">machine functions</span></td>
                                </tr>
                                <tr className="hover:bg-white/5">
                                    <td className="p-6 border-r border-white/10 text-center">Used for <span className="text-lime-300 font-semibold">machining operations</span></td>
                                    <td className="p-6 text-center">Used for <span className="text-orange-300 font-semibold">auxiliary operations</span></td>
                                </tr>
                                <tr className="hover:bg-white/5">
                                    <td className="p-6 border-r border-white/10 text-center font-mono text-gray-400">Example: <span className="text-lime-300">G01, G02</span></td>
                                    <td className="p-6 text-center font-mono text-gray-400">Example: <span className="text-orange-300">M03, M08</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default GMCodes;
