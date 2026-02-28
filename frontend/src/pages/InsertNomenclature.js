import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AuthContext } from '../App';
import ChatbotBackground from '../components/ChatbotBackground';

function InsertNomenclature() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleBack = () => {
        if (user?.role === 'teacher') {
            navigate('/teacher-dashboard');
        } else {
            navigate('/student-dashboard');
        }
    };

    const tableHeaderStyle = "px-4 py-3 text-left text-sm font-semibold text-indigo-300 uppercase tracking-wider border-b border-white/10";
    const tableCellStyle = "px-4 py-3 text-sm text-gray-300 border-b border-white/5";

    return (
        <div className="min-h-screen text-white p-8 overflow-y-auto relative z-0">
            <ChatbotBackground />
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
                    className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    INSERT NOMENCLATURE
                </h1>

                {/* Short Introduction */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12 backdrop-blur-sm">
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Insert nomenclature is a standard coding system used to identify cutting inserts used in CNC machining.
                        The nomenclature provides information about the insert <strong className="text-indigo-400">shape, clearance angle, size, thickness, and nose radius</strong>.
                        This system helps operators and students select the correct insert for accurate, safe, and efficient machining operations.
                    </p>
                </div>

                {/* ===================== TABLE 1: Insert Shape Codes ===================== */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-indigo-400 flex items-center gap-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        <span className="w-2 h-8 bg-indigo-400 rounded-full"></span>
                        Table 1: Insert Shape Codes
                    </h2>
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className={tableHeaderStyle}>Symbol</th>
                                        <th className={tableHeaderStyle}>Insert Shape</th>
                                        <th className={tableHeaderStyle}>Included Angle</th>
                                        <th className={tableHeaderStyle}>Typical Application</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['H', 'Hexagonal', '120°', 'Heavy turning'],
                                        ['O', 'Octagonal', '135°', 'Heavy roughing'],
                                        ['P', 'Pentagonal', '108°', 'Medium cutting'],
                                        ['S', 'Square', '90°', 'General purpose'],
                                        ['T', 'Triangular', '60°', 'Profiling'],
                                        ['C', 'Rhombic 80°', '80°', 'Finishing'],
                                        ['D', 'Rhombic 55°', '55°', 'Precision turning'],
                                        ['E', 'Rhombic 75°', '75°', 'Semi-finishing'],
                                        ['V', 'Rhombic 35°', '35°', 'Fine profiling'],
                                        ['W', 'Trigon 80°', '80°', 'High feed cutting'],
                                        ['R', 'Round', '—', 'Contouring'],
                                        ['K', 'Parallelogram 55°', '55°', 'Facing operations'],
                                        ['L', 'Parallelogram 90°', '90°', 'General turning'],
                                        ['M', 'Diamond 86°', '86°', 'Rough turning'],
                                        ['Q', 'Square with chamfer', '90°', 'Heavy machining'],
                                    ].map(([symbol, shape, angle, app], idx) => (
                                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                                            <td className={tableCellStyle}><span className="text-indigo-400 font-bold font-mono text-lg">{symbol}</span></td>
                                            <td className={tableCellStyle}>{shape}</td>
                                            <td className={tableCellStyle}>{angle}</td>
                                            <td className={tableCellStyle}>{app}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Included Angle explanation */}
                    <div className="mt-6 bg-white/5 border-l-4 border-indigo-500 rounded-r-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-2">Included Angle</h3>
                        <p className="text-gray-300 leading-relaxed">
                            The included angle is the angle formed between the two cutting edges of the insert. It affects the strength of the insert and its suitability for roughing or finishing.
                        </p>
                    </div>
                </div>

                {/* ===================== TABLE 2: Insert Clearance Angle Codes ===================== */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-purple-400 flex items-center gap-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        <span className="w-2 h-8 bg-purple-400 rounded-full"></span>
                        Table 2: Insert Clearance Angle Codes
                    </h2>
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className={tableHeaderStyle}>Code</th>
                                        <th className={tableHeaderStyle}>Clearance Angle</th>
                                        <th className={tableHeaderStyle}>Type of Cutting</th>
                                        <th className={tableHeaderStyle}>Application Area</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['A', '3°', 'Negative insert', 'Heavy roughing'],
                                        ['B', '5°', 'Low clearance', 'Medium cutting'],
                                        ['C', '7°', 'Standard clearance', 'General machining'],
                                        ['D', '15°', 'Positive insert', 'Light finishing'],
                                        ['E', '20°', 'High clearance', 'Soft materials'],
                                        ['F', '25°', 'Very high clearance', 'Aluminum machining'],
                                        ['G', '30°', 'Extra clearance', 'Light cutting'],
                                        ['H', '0°', 'Neutral', 'Heavy duty cutting'],
                                        ['J', '2°', 'Very low clearance', 'Hard materials'],
                                        ['K', '10°', 'Medium clearance', 'Semi-finishing'],
                                        ['L', '12°', 'Standard positive', 'Turning operations'],
                                        ['M', '18°', 'Fine finishing', 'Precision work'],
                                        ['N', '6°', 'Balanced clearance', 'General use'],
                                        ['P', '8°', 'Moderate clearance', 'Facing operations'],
                                        ['R', '11°', 'Improved chip flow', 'Roughing'],
                                    ].map(([code, angle, type, app], idx) => (
                                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                                            <td className={tableCellStyle}><span className="text-purple-400 font-bold font-mono text-lg">{code}</span></td>
                                            <td className={tableCellStyle}>{angle}</td>
                                            <td className={tableCellStyle}>{type}</td>
                                            <td className={tableCellStyle}>{app}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Type of Cutting explanation */}
                    <div className="mt-6 bg-white/5 border-l-4 border-purple-500 rounded-r-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-2">Type of Cutting</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Type of cutting refers to the machining operation performed, such as roughing, finishing, facing, or profiling. It determines the insert shape, angle, and cutting parameters used.
                        </p>
                    </div>
                </div>

                {/* ===================== TABLE 3: Insert Thickness & Size Codes ===================== */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-cyan-400 flex items-center gap-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        <span className="w-2 h-8 bg-cyan-400 rounded-full"></span>
                        Table 3: Insert Thickness & Size Codes
                    </h2>
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className={tableHeaderStyle}>Code</th>
                                        <th className={tableHeaderStyle}>Thickness (mm)</th>
                                        <th className={tableHeaderStyle}>Typical Size (mm)</th>
                                        <th className={tableHeaderStyle}>Application Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['02', '2.38 mm', '6 mm', 'Light finishing'],
                                        ['03', '3.18 mm', '9 mm', 'Medium finishing'],
                                        ['04', '4.76 mm', '12 mm', 'General turning'],
                                        ['05', '5.56 mm', '16 mm', 'Roughing'],
                                        ['06', '6.35 mm', '19 mm', 'Heavy roughing'],
                                        ['07', '7.94 mm', '25 mm', 'Heavy duty cutting'],
                                        ['08', '9.52 mm', '32 mm', 'Industrial machining'],
                                        ['09', '11.11 mm', '40 mm', 'Heavy applications'],
                                        ['10', '12.7 mm', '50 mm', 'Large scale machining'],
                                        ['11', '14.28 mm', '60 mm', 'Heavy turning'],
                                        ['12', '15.87 mm', '75 mm', 'Industrial cutting'],
                                        ['13', '17.46 mm', '90 mm', 'Large workpieces'],
                                        ['14', '19.05 mm', '100 mm', 'Extreme roughing'],
                                        ['15', '20.63 mm', '110 mm', 'Special machining'],
                                        ['16', '22.22 mm', '120 mm', 'High load cutting'],
                                    ].map(([code, thickness, size, app], idx) => (
                                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                                            <td className={tableCellStyle}><span className="text-cyan-400 font-bold font-mono text-lg">{code}</span></td>
                                            <td className={tableCellStyle}>{thickness}</td>
                                            <td className={tableCellStyle}>{size}</td>
                                            <td className={tableCellStyle}>{app}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ===================== EXAMPLES ===================== */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-8 text-indigo-400 flex items-center gap-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        <span className="w-2 h-8 bg-indigo-400 rounded-full"></span>
                        Examples
                    </h2>

                    <div className="flex flex-col gap-8">
                        {/* Example 1: DNMG 150608 */}
                        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl p-8 border border-white/10">
                            <h3 className="text-2xl font-bold mb-6 text-white">
                                1. <span className="font-mono bg-white/10 px-4 py-1 rounded-lg ml-2">DNMG 150608</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                                {[
                                    { code: 'D', label: 'Insert shape', desc: '(55° diamond)' },
                                    { code: 'N', label: 'Clearance angle', desc: '(0° clearance – negative insert)' },
                                    { code: 'M', label: 'Tolerance class', desc: '(Medium precision)' },
                                    { code: 'G', label: 'Insert type', desc: '(With hole and chip breaker)' },
                                    { code: '15', label: 'Insert size', desc: '(15 mm inscribed circle)' },
                                    { code: '06', label: 'Insert thickness', desc: '(6.35 mm approx.)' },
                                    { code: '08', label: 'Nose radius', desc: '(0.8 mm)' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/5">
                                        <span className="text-3xl font-bold text-indigo-400 font-mono w-16 text-center">{item.code}</span>
                                        <div className="flex flex-col">
                                            <span className="text-white font-semibold text-lg">{item.label}</span>
                                            {item.desc && <span className="text-gray-400 text-sm">{item.desc}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Example 2: TNMG 160404 */}
                        <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-2xl p-8 border border-white/10">
                            <h3 className="text-2xl font-bold mb-6 text-white">
                                2. <span className="font-mono bg-white/10 px-4 py-1 rounded-lg ml-2">TNMG 160404</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                                {[
                                    { code: 'T', label: 'Insert shape', desc: '(Triangular 60°)' },
                                    { code: 'N', label: 'Clearance angle', desc: '(0° clearance)' },
                                    { code: 'M', label: 'Tolerance class', desc: '(Medium)' },
                                    { code: 'G', label: 'Insert type', desc: '(Hole + chip breaker)' },
                                    { code: '16', label: 'Insert size', desc: '(16 mm)' },
                                    { code: '04', label: 'Insert thickness', desc: '(4.76 mm approx.)' },
                                    { code: '04', label: 'Nose radius', desc: '(0.4 mm)' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/5">
                                        <span className="text-3xl font-bold text-purple-400 font-mono w-16 text-center">{item.code}</span>
                                        <div className="flex flex-col">
                                            <span className="text-white font-semibold text-lg">{item.label}</span>
                                            {item.desc && <span className="text-gray-400 text-sm">{item.desc}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Example 3: VNMG 160408 */}
                        <div className="bg-gradient-to-br from-cyan-900/20 to-indigo-900/20 rounded-2xl p-8 border border-white/10">
                            <h3 className="text-2xl font-bold mb-6 text-white">
                                3. <span className="font-mono bg-white/10 px-4 py-1 rounded-lg ml-2">VNMG 160408</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                                {[
                                    { code: 'V', label: 'Insert shape', desc: '(35° diamond)' },
                                    { code: 'N', label: 'Clearance angle', desc: '(0° clearance)' },
                                    { code: 'M', label: 'Tolerance class', desc: '(Medium)' },
                                    { code: 'G', label: 'Insert type', desc: '(With hole and chip breaker)' },
                                    { code: '16', label: 'Insert size', desc: '(16 mm)' },
                                    { code: '04', label: 'Insert thickness', desc: '(4.76 mm approx.)' },
                                    { code: '08', label: 'Nose radius', desc: '(0.8 mm)' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/5">
                                        <span className="text-3xl font-bold text-cyan-400 font-mono w-16 text-center">{item.code}</span>
                                        <div className="flex flex-col">
                                            <span className="text-white font-semibold text-lg">{item.label}</span>
                                            {item.desc && <span className="text-gray-400 text-sm">{item.desc}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Example 4: CCMT 09T304 */}
                        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl p-8 border border-white/10">
                            <h3 className="text-2xl font-bold mb-6 text-white">
                                4. <span className="font-mono bg-white/10 px-4 py-1 rounded-lg ml-2">CCMT 09T304</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                                {[
                                    { code: 'C', label: 'Insert shape', desc: '(80° diamond)' },
                                    { code: 'C', label: 'Clearance angle', desc: '(7° positive insert)' },
                                    { code: 'M', label: 'Tolerance class', desc: '(Medium precision)' },
                                    { code: 'T', label: 'Insert type', desc: '(With hole, single-sided)' },
                                    { code: '09', label: 'Insert size', desc: '(9 mm)' },
                                    { code: 'T3', label: 'Insert thickness', desc: '(3.97 mm approx.)' },
                                    { code: '04', label: 'Nose radius', desc: '(0.4 mm)' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/5">
                                        <span className="text-3xl font-bold text-indigo-400 font-mono w-16 text-center">{item.code}</span>
                                        <div className="flex flex-col">
                                            <span className="text-white font-semibold text-lg">{item.label}</span>
                                            {item.desc && <span className="text-gray-400 text-sm">{item.desc}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default InsertNomenclature;
