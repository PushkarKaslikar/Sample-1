import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Loader2, Bug } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

// Typewriter component for the streaming effect
const Typewriter = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const indexRef = useRef(0);

    useEffect(() => {
        // Reset if text changes (though typically it won't for a specific message instance)
        setDisplayedText('');
        indexRef.current = 0;

        const intervalId = setInterval(() => {
            if (indexRef.current < text.length) {
                setDisplayedText((prev) => prev + text.charAt(indexRef.current));
                indexRef.current += 1;
            } else {
                clearInterval(intervalId);
                onComplete && onComplete();
            }
        }, 15); // Adjust speed: 15ms is roughly 60fps-ish typing

        return () => clearInterval(intervalId);
    }, [text, onComplete]);

    return <span className="whitespace-pre-wrap leading-relaxed">{displayedText}</span>;
};

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your AI assistant. How can I help you today?', animate: false }
    ]);
    const [input, setInput] = useState('');
    const [apiKey] = useState(process.env.REACT_APP_OPENROUTER_API_KEY || '');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // Debugging: Check if API Key is loaded
    useEffect(() => {
        if (!apiKey) {
            console.error("CRITICAL: REACT_APP_OPENROUTER_API_KEY is missing!");
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "⚠️ **Configuration Error**: `REACT_APP_OPENROUTER_API_KEY` is missing.\n\nPlease go to Vercel -> Settings -> Environment Variables and ensure it is set exactly with that name, then Redeploy.",
                animate: false
            }]);
        } else {
            console.log("API Key loaded successfully. Length:", apiKey.length);
        }
    }, [apiKey]);

    // Debugging function to check available models
    const checkModels = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("https://openrouter.ai/api/v1/models", {
                headers: {
                    "Authorization": `Bearer ${apiKey}`
                }
            });
            console.log("Models:", response.data);

            const freeModels = response.data.data
                .filter(m => m.id.includes('free'))
                .map(m => m.id);

            const message = `Found ${response.data.data.length} models. Free models: ${freeModels.join(', ')}`;
            // Debug messages don't need animation
            setMessages(prev => [...prev, { role: 'assistant', content: "DEBUG: " + message, animate: false }]);

        } catch (error) {
            console.error("Model Check Error:", error);
            let errMsg = error.message;
            if (error.response) {
                errMsg = `Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}`;
            }
            setMessages(prev => [...prev, { role: 'assistant', content: "DEBUG ERROR: " + errMsg, animate: false }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        if (!apiKey) {
            toast.error("API Key is missing.");
            return;
        }

        const userMessage = { role: 'user', content: input, animate: false };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axios.post(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    model: "deepseek/deepseek-r1",
                    messages: [
                        ...messages.map(m => ({ role: m.role, content: m.content })),
                        userMessage
                    ]
                },
                {
                    headers: {
                        "Authorization": `Bearer ${apiKey}`,
                        "HTTP-Referer": window.location.origin,
                        "X-Title": "Mechtron Chatbot",
                        "Content-Type": "application/json"
                    }
                }
            );

            const botContent = response.data.choices?.[0]?.message?.content || "I couldn't generate a response.";

            const botMessage = {
                role: 'assistant',
                content: botContent,
                animate: true // Enable animation for new messages
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat Error:", error);

            let errorMessage = "An error occurred.";
            if (error.response) {
                errorMessage = error.response.data?.error?.message || `Error: ${error.response.status}`;
                if (error.response.status === 404) {
                    errorMessage += " (Model not found or API endpoint error)";
                }
            } else if (error.request) {
                errorMessage = "No response received from server.";
            } else {
                errorMessage = error.message;
            }

            toast.error(errorMessage);
            setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, something went wrong: ${errorMessage}`, animate: false }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] bg-slate-900 text-white mt-16 overflow-hidden">
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full relative">

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex gap-4 max-w-3xl mx-auto ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`flex items-center gap-2 mb-1 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-blue-600' : 'bg-green-600'}`}>
                                        {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                    </div>
                                    <span className="text-xs text-gray-400 capitalize">{msg.role}</span>
                                </div>

                                <div className={`p-4 rounded-2xl ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-none'
                                    : 'bg-slate-800 text-gray-100 rounded-tl-none border border-white/10'
                                    }`}>
                                    {msg.role === 'assistant' && msg.animate ? (
                                        <Typewriter text={msg.content} onComplete={() => scrollToBottom()} />
                                    ) : (
                                        <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-4 max-w-3xl mx-auto justify-start">
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
                    <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-4">
                        <button
                            type="button"
                            onClick={checkModels}
                            className="p-3 rounded-xl bg-slate-800 text-gray-400 hover:text-yellow-400 transition-colors mr-2"
                            title="Debug: Check available models"
                        >
                            <Bug className="w-5 h-5" />
                        </button>
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
};

export default Chatbot;
