import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import axios from 'axios';

function App() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your AI assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Use VITE_ prefix for Vite environment variables
        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        if (!apiKey) {
            toast.error("API Key is missing. Please check .env file.");
            return;
        }

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const modelsToTry = [
            "google/gemma-3-12b-it:free",              // Verified available
            "meta-llama/llama-3.3-70b-instruct:free",  // Verified available
            "meta-llama/llama-3.2-3b-instruct:free",   // Verified available
            "mistralai/mistral-small-3.1-24b-instruct:free", // Verified available
            "qwen/qwen-2.5-vl-7b-instruct:free",       // Verified available
            "nvidia/nemotron-3-nano-30b-a3b:free"      // Verified available
        ];

        let lastError = null;

        for (const model of modelsToTry) {
            try {
                // console.log(`Attempting with model: ${model}`); // Optional debug

                let apiMessages = [];
                // Google models (Gemma/Gemini) often error with "system" role on OpenRouter free tier
                if (model.includes("google") || model.includes("gemma") || model.includes("gemini")) {
                    const systemPrompt = "You are a helpful assistant. ";
                    const history = messages.map(m => ({ role: m.role, content: m.content }));

                    if (history.length > 0 && history[0].role === 'user') {
                        history[0].content = systemPrompt + history[0].content;
                        apiMessages = [...history, userMessage];
                    } else {
                        // If no history or first msg isn't user (unlikely), just prepend system to current
                        apiMessages = [...history, { role: 'user', content: systemPrompt + userMessage.content }];
                    }
                } else {
                    // Standard behavior for Llama, Mistral, etc.
                    apiMessages = [
                        { role: "system", content: "You are a helpful assistant." },
                        ...messages.map(m => ({ role: m.role, content: m.content })),
                        userMessage
                    ];
                }

                const response = await axios.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    {
                        model: model,
                        messages: apiMessages
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${apiKey}`,
                            "Content-Type": "application/json",
                            "HTTP-Referer": window.location.origin,
                            "X-Title": "Mech Chatbot Standalone"
                        }
                    }
                );

                const botContent = response.data.choices?.[0]?.message?.content || "I couldn't generate a response.";
                setMessages(prev => [...prev, { role: 'assistant', content: botContent }]);
                setIsLoading(false);
                return; // Success! Exit loop

            } catch (error) {
                console.warn(`Failed with ${model}:`, error.message);
                if (error.response) {
                    console.warn("Error details:", error.response.data);
                }
                lastError = error;
                // Continue to next model
            }
        }

        // If loop finishes, all failed
        console.error("All models failed:", lastError);
        let msg = "All AI models are busy. Please try again later.";
        if (lastError?.response?.status === 429) {
            msg = "Rate limit reached on all free models. Please wait a moment.";
        }
        toast.error(msg);
        setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting to the AI models right now." }]);
        setIsLoading(false);
    };

    return (
        <div className="flex h-screen bg-slate-900 text-white overflow-hidden">
            <Toaster position="top-right" />
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full relative max-w-4xl mx-auto w-full">

                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-slate-950/50">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg">Mech AI Assistant</h1>
                        <p className="text-xs text-gray-400">Powered by Gemini 2.0</p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`flex items-center gap-2 mb-1 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-blue-600' : 'bg-green-600'}`}>
                                        {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                    </div>
                                    <span className="text-xs text-gray-400 capitalize">{msg.role}</span>
                                </div>

                                <div className={`p-4 rounded-2xl shadow-md ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-none'
                                    : 'bg-slate-800 text-gray-100 rounded-tl-none border border-white/10'
                                    }`}>
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-4 justify-start">
                            <div className="flex flex-col items-start">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                                        <Bot className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs text-gray-400">Assistant</span>
                                </div>
                                <div className="bg-slate-800 text-gray-100 rounded-2xl rounded-tl-none border border-white/10 p-4">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-white/10 bg-slate-950 p-4">
                    <form onSubmit={handleSend} className="flex gap-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 rounded-xl transition-colors flex items-center justify-center"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
