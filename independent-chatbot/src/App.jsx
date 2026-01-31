import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            toast.error("API Key is missing. Please check .env file.");
            return;
        }

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

            // Convert history to Gemini format
            let history = messages
                .filter(m => m.role !== 'system')
                .map(m => ({
                    role: m.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: m.content }]
                }));

            // Gemini requires history to start with 'user'
            if (history.length > 0 && history[0].role === 'model') {
                history = history.slice(1);
            }

            const chat = model.startChat({
                history: history,
            });

            // Use sendMessageStream for typing effect
            const result = await chat.sendMessageStream(input);

            // Create a placeholder message for the assistant
            setIsLoading(false); // Stop loading spinner as soon as stream starts
            setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

            let fullResponse = '';
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullResponse += chunkText;

                // Update the last message with the new chunk
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMsg = newMessages[newMessages.length - 1];
                    // Ensure we are updating the assistant's message
                    if (lastMsg.role === 'assistant') {
                        lastMsg.content = fullResponse;
                    }
                    return newMessages;
                });
            }

        } catch (error) {
            console.error("Gemini Error:", error);
            setIsLoading(false);

            let errorMessage = "Something went wrong. Please try again.";

            if (error.message?.includes("API key")) {
                errorMessage = "Invalid API Key. Please check your configuration.";
            } else if (error.message?.includes("429")) {
                errorMessage = "Too many requests. Please wait a moment.";
            }

            toast.error(errorMessage);
            // Only add error message if we haven't started streaming yet (or just append it?)
            // If we failed mid-stream, the user sees partial content which is fine.
            // If we failed before start, add error msg.
            setMessages(prev => {
                const lastMsg = prev[prev.length - 1];
                if (lastMsg.role === 'user') {
                    return [...prev, { role: 'assistant', content: "Sorry, I encountered an error connecting to Google Gemini." }];
                }
                return prev;
            });
        }
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
                        <p className="text-xs text-gray-400">Powered by Gemini Flash</p>
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

                                <div className={`p-4 rounded-2xl shadow-md overflow-hidden ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-none'
                                    : 'bg-slate-800 text-gray-100 rounded-tl-none border border-white/10'
                                    }`}>
                                    {msg.role === 'user' ? (
                                        <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                    ) : (
                                        <div className="prose prose-invert prose-sm max-w-none">
                                            <ReactMarkdown
                                                children={msg.content}
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    code({ node, inline, className, children, ...props }) {
                                                        const match = /language-(\w+)/.exec(className || '');
                                                        return !inline && match ? (
                                                            <SyntaxHighlighter
                                                                children={String(children).replace(/\n$/, '')}
                                                                style={atomDark}
                                                                language={match[1]}
                                                                PreTag="div"
                                                                {...props}
                                                            />
                                                        ) : (
                                                            <code className={`${className} bg-slate-700 px-1 py-0.5 rounded text-sm`} {...props}>
                                                                {children}
                                                            </code>
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
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
