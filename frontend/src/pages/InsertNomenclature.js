import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AuthContext } from '../App';

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

                {/* Label of Insert Nomenclature Diagram */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-8 text-indigo-400 flex items-center gap-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        <span className="w-2 h-8 bg-indigo-400 rounded-full"></span>
                        Label of Insert Nomenclature Diagram
                    </h2>




                    <div className="flex flex-col gap-8">
                        {/* 1. Insert Shape */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-indigo-500/30 transition-colors">
                            <h3 className="text-xl font-bold mb-4 text-white">1. Insert shape</h3>
                            <div className="bg-black/40 rounded-lg p-4 flex items-center justify-center border border-white/5 overflow-hidden">
                                <img
                                    src="/images/insert_images/insert_shape.png"
                                    alt="Insert Shape"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>

                        {/* 2. Insert Angle */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-indigo-500/30 transition-colors">
                            <h3 className="text-xl font-bold mb-4 text-white">2. Insert Angle</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-black/40 rounded-lg p-4 flex items-center justify-center border border-white/5 overflow-hidden">
                                    <img
                                        src="/images/insert_images/insert_angle_1.png"
                                        alt="Insert Angle 1"
                                        className="max-w-sm h-auto object-contain"
                                    />
                                </div>
                                <div className="bg-black/40 rounded-lg p-4 flex items-center justify-center border border-white/5 overflow-hidden">
                                    <img
                                        src="/images/insert_images/inser_angle_2.png"
                                        // Note: using 'inser_angle_2.png' as found in the directory
                                        alt="Insert Angle 2"
                                        className="max-w-sm h-auto object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 3. Insert Size */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-indigo-500/30 transition-colors">
                            <h3 className="text-xl font-bold mb-4 text-white">3. Insert size</h3>
                            <div className="bg-black/40 rounded-lg p-4 flex items-center justify-center border border-white/5 overflow-hidden">
                                <img
                                    src="/images/insert_images/insert_size.png"
                                    alt="Insert Size"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>

                        {/* 4. Thickness */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-indigo-500/30 transition-colors">
                            <h3 className="text-xl font-bold mb-4 text-white">4. Thickness</h3>
                            <div className="bg-black/40 rounded-lg p-4 flex items-center justify-center border border-white/5 overflow-hidden">
                                <img
                                    src="/images/insert_images/thickness.png"
                                    alt="Thickness"
                                    className="max-w-sm h-auto object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Example Insert Code */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-8 text-purple-400 flex items-center gap-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        <span className="w-2 h-8 bg-purple-400 rounded-full"></span>
                        Example Insert Code: <span className="font-mono text-white ml-2 bg-white/10 px-4 py-1 rounded-lg">CNMG 120408</span>
                    </h2>

                    <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl p-8 border border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                            {[
                                { code: 'C', label: 'Insert shape', desc: '(80° diamond)' },
                                { code: 'N', label: 'Clearance angle', desc: '(0° clearance)' },
                                { code: 'M', label: 'Tolerance class', desc: '' },
                                { code: 'G', label: 'Insert type', desc: '(with hole and chip breaker)' },
                                { code: '12', label: 'Insert size', desc: '' },
                                { code: '04', label: 'Insert thickness', desc: '' },
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
                </div>

                {/* Importance */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Importance of Insert Nomenclature
                    </h2>
                    <div className="bg-white/5 border-l-4 border-indigo-500 rounded-r-xl p-6">
                        <p className="text-gray-300 leading-relaxed">
                            Insert nomenclature is important because it allows incorrect selection of inserts, improves machining accuracy, reduces tool wear, and prevents improper tool usage. It is widely used in CNC programming, tool selection, and industrial machining practices.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default InsertNomenclature;
