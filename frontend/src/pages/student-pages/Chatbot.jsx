// https://n8n.srv1106977.hstgr.cloud/webhook/3628e990-c0e2-40ba-8628-13e0386054cd

import { useState } from "react";
import StudentNavbar from "../../components/StudentNavbar";

const Chatbot = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello! How can I help you today?"
        }
    ]);

    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {

        if (!message.trim()) return;

        const userMessage = {
            sender: "user",
            text: message
        };

        setMessages(prev => [...prev, userMessage]);

        const currentMessage = message;
        setMessage("");
        setLoading(true);

        try {

            const res = await fetch(
                "https://n8n.srv1106977.hstgr.cloud/webhook/3628e990-c0e2-40ba-8628-13e0386054cd",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: currentMessage
                    })
                }
            );

            const data = await res.json();

            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    text:
                        data.reply ||
                        data.output ||
                        data.response ||
                        JSON.stringify(data)
                }
            ]);

        } catch (err) {

            console.log(err);

            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    text: "Something went wrong."
                }
            ]);

        }

        setLoading(false);
    };

    return (
<div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-50">
    {/* Sticky Navbar */}
    <div className="sticky top-0 z-50 flex-shrink-0">
        <StudentNavbar />
    </div>

    {/* Chat Container - Full Screen */}
    <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <div className="w-full max-w-5xl h-full bg-white rounded-2xl shadow-xl border border-slate-200/80 flex flex-col overflow-hidden">

            {/* Header - Compact */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                                HireFlow AI Assistant
                            </h1>
                            <p className="text-xs text-blue-100 mt-0.5">
                                Powered by AI • Ask me anything
                            </p>
                        </div>
                    </div>
                    
                    {/* Online Status */}
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs text-blue-100 font-medium">Online</span>
                    </div>
                </div>
            </div>

            {/* Chat Messages - Full Height */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/30 scroll-smooth">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            msg.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                        } animate-fadeIn`}
                    >
                        <div
                            className={`max-w-[85%] sm:max-w-[70%] px-4 py-3 rounded-2xl ${
                                msg.sender === "user"
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                                    : "bg-white text-slate-800 border border-slate-200/80 shadow-sm"
                            }`}
                        >
                            {/* Avatar for AI messages */}
                            {msg.sender === "ai" && (
                                <div className="flex items-center gap-2 mb-1.5">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500">AI Assistant</span>
                                </div>
                            )}
                            
                            {/* Avatar for user messages */}
                            {msg.sender === "user" && (
                                <div className="flex items-center gap-2 mb-1.5 justify-end">
                                    <span className="text-xs font-medium text-blue-100">You</span>
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                            )}

                            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                {msg.text}
                            </p>
                            
                            {/* Timestamp */}
                            {msg.timestamp && (
                                <p className="text-[10px] opacity-60 mt-1.5 text-right">
                                    {msg.timestamp}
                                </p>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start animate-fadeIn">
                        <div className="bg-white border border-slate-200/80 shadow-sm px-4 py-3 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <span className="text-sm text-slate-500">AI is thinking</span>
                                <span className="flex gap-1.5">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area - Fixed Bottom */}
            <div className="border-t border-slate-200/80 p-4 bg-white flex-shrink-0">
                <div className="flex gap-3 max-w-5xl mx-auto">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            className="
                            w-full
                            px-4 py-3
                            bg-slate-50
                            border border-slate-200
                            rounded-xl
                            text-sm text-slate-800
                            placeholder:text-slate-400
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500/20
                            focus:border-blue-500
                            transition-all
                            duration-200
                            pr-12
                            "
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                    </div>
                    <button
                        onClick={sendMessage}
                        disabled={!message.trim()}
                        className="
                        px-6 py-3
                        bg-gradient-to-r from-blue-600 to-indigo-600
                        text-white
                        text-sm
                        font-medium
                        rounded-xl
                        hover:from-blue-700 hover:to-indigo-700
                        hover:shadow-md
                        transition-all
                        duration-200
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        disabled:hover:shadow-none
                        flex items-center gap-2
                        whitespace-nowrap
                        min-w-[100px]
                        justify-center
                        "
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send
                    </button>
                </div>
            </div>

        </div>
    </div>

    {/* CSS Animations */}
    <style>{`
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(8px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fadeIn {
            animation: fadeIn 0.25s ease-out;
        }
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-4px);
            }
        }
        .animate-bounce {
            animation: bounce 1s infinite;
        }
        
        /* Scrollbar Styling */
        .overflow-y-auto::-webkit-scrollbar {
            width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
            background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
    `}</style>
</div>
    );
};

export default Chatbot;