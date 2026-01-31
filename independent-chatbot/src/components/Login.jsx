import React, { useState } from 'react';
import { Lock, ArrowRight, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

function Login({ onLogin }) {
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Get password from env
        const correctPassword = import.meta.env.VITE_TEACHER_PASSWORD;

        // Simulate a small delay for better UX
        setTimeout(() => {
            if (password === correctPassword) {
                toast.success("Welcome back, Teacher!");
                onLogin();
            } else {
                toast.error("Incorrect password. Access denied.");
                setPassword('');
            }
            setIsLoading(false);
        }, 600);
    };

    return (
        <div className="flex h-screen bg-slate-900 w-full items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-950 border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Teacher Access</h1>
                    <p className="text-slate-400 text-sm mt-2 text-center">
                        Please enter your secure password to access the AI assistant.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600"
                                placeholder="Enter password..."
                                autoFocus
                            />
                            <Lock className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !password}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            "Verifying..."
                        ) : (
                            <>
                                Access System <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
