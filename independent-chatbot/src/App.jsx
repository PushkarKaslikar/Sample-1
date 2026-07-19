import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';
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
        // Crucial fix: Prevent double submissions if already loading/thinking
        if (!input.trim() || isLoading) return;

        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        if (!apiKey) {
            toast.error("OpenRouter API Key (VITE_OPENROUTER_API_KEY) is missing in your .env file.");
            return;
        }

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // OPENROUTER SSE STREAMING DIRECT TO THE BROWSER (No CORS issues)
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey.replace(/['"]+/g, '').trim()}`,
                    "HTTP-Referer": window.location.origin,
                    "X-Title": "Mech AI Assistant"
                },
                body: JSON.stringify({
                    model: "nvidia/nemotron-3-ultra-550b-a55b:free",
                    messages: [
                        ...messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content })),
                        userMessage
                    ],
                    stream: true
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Request failed: ${response.status} - ${errText}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            
            // Append assistant placeholder bubble
            setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

            let fullResponse = '';
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    setIsLoading(false);
                    break;
                }

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed) continue;
                    
                    if (trimmed.startsWith('data: ')) {
                        const dataStr = trimmed.slice(6).trim();
                        if (dataStr === '[DONE]') {
                            break;
                        }
                        try {
                            const parsed = JSON.parse(dataStr);
                            if (parsed.error) {
                                throw new Error(parsed.error);
                            }
                            const text = parsed.choices?.[0]?.delta?.content || '';
                            fullResponse += text;

                            setMessages(prev => {
                                const newMessages = [...prev];
                                const lastMsg = newMessages[newMessages.length - 1];
                                if (lastMsg.role === 'assistant') {
                                    lastMsg.content = fullResponse;
                                }
                                return newMessages;
                            });
                        } catch (e) {
                            // Ignore partial line parses
                        }
                    }
                }
            }

            // Fallback if model responded with completely empty content (e.g. on brief acknowledgments)
            if (!fullResponse.trim()) {
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMsg = newMessages[newMessages.length - 1];
                    if (lastMsg.role === 'assistant' && !lastMsg.content) {
                        lastMsg.content = "*(Acknowledged)*";
                    }
                    return newMessages;
                });
            }

        } catch (error) {
            console.error("AI Generation Error:", error);
            setIsLoading(false);

            let errorMessage = error.message || "Something went wrong. Please try again.";
            toast.error(errorMessage);

            setMessages(prev => {
                const lastMsg = prev[prev.length - 1];
                if (lastMsg.role === 'user') {
                    return [...prev, { role: 'assistant', content: `Sorry, I encountered an error: ${errorMessage}` }];
                }
                if (lastMsg.role === 'assistant' && !lastMsg.content) {
                    lastMsg.content = `Sorry, I encountered an error: ${errorMessage}`;
                    return [...prev];
                }
                return prev;
            });
        }
    };

    return (
        <div className="flex h-screen bg-slate-900 text-white overflow-hidden relative selection:bg-blue-500/30">
            {/* Background Gradient Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-black pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none mix-blend-screen animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none mix-blend-screen animate-pulse" />

            <Toaster position="top-right" theme="dark" />

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full relative z-10 max-w-5xl mx-auto w-full backdrop-blur-[2px]">

                {/* Glass Header */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-slate-900/40 backdrop-blur-xl sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                                <Bot className="w-7 h-7 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full animate-bounce" />
                        </div>
                        <div>
                            <h1 className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-100 to-blue-300 bg-clip-text text-transparent">
                                Mech AI Assistant
                            </h1>
                            <p className="text-xs text-blue-200/60 font-medium">Powered by Nvidia Nemotron</p>
                        </div>
                    </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex gap-4 animate-slide-up ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {/* Avatar for Assistant */}
                            {msg.role !== 'user' && (
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex-shrink-0 flex items-center justify-center shadow-lg shadow-emerald-500/20 mt-1">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                            )}

                            {/* Message Bubble */}
                            <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <div
                                    className={`
                                        px-5 py-3.5 shadow-lg backdrop-blur-sm
                                        ${msg.role === 'user'
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-sm'
                                            : 'bg-slate-800/80 border border-white/10 text-slate-100 rounded-2xl rounded-tl-sm hover:bg-slate-800/90 transition-colors'
                                        }
                                    `}
                                >
                                    {msg.role === 'user' ? (
                                        <p className="whitespace-pre-wrap leading-relaxed text-[0.95rem]">{msg.content}</p>
                                    ) : (
                                        msg.content ? (
                                            <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-slate-950/50 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl">
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
                                                                    customStyle={{ margin: 0, background: 'transparent' }}
                                                                    {...props}
                                                                />
                                                            ) : (
                                                                <code className={`${className} bg-slate-700/50 px-1.5 py-0.5 rounded text-sm text-blue-200 font-medium`} {...props}>
                                                                    {children}
                                                                </code>
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-slate-400 py-1 min-w-[100px]">
                                                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                                                <span className="text-xs font-semibold italic animate-pulse">Thinking...</span>
                                            </div>
                                        )
                                    )}
                                </div>
                                <span className="text-[10px] text-gray-500 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {msg.role === 'user' ? 'You' : 'Assistant'}
                                </span>
                            </div>

                            {/* Avatar for User */}
                            {msg.role === 'user' && (
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 flex-shrink-0 flex items-center justify-center shadow-lg shadow-blue-500/20 mt-1">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Loading Indicator (Only shown before assistant bubble is created) */}
                    {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                        <div className="flex gap-4 justify-start animate-fade-in">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center mt-1">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="bg-slate-800/80 border border-white/10 rounded-2xl rounded-tl-sm p-4 flex items-center gap-3 shadow-sm">
                                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                                <span className="text-sm text-gray-400">Thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Floating Input Area */}
                <div className="p-4 md:p-6 bg-transparent">
                    <div className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-2 md:p-2.5 shadow-2xl shadow-blue-900/5">
                        <form onSubmit={handleSend} className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything about engineering..."
                                className="flex-1 bg-transparent border-0 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-0 focus:outline-none text-[0.95rem]"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-700 disabled:to-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white w-10 h-10 md:w-12 md:h-12 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg shadow-blue-500/25 active:scale-95"
                            >
                                <Send className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
