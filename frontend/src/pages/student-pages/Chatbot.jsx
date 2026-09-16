import { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Loader2, 
  FileText, 
  Briefcase, 
  MessageSquareQuote,
  Lightbulb
} from "lucide-react";
import StudentNavbar from "../../components/StudentNavbar";
import api from "../../services/api";

const SUGGESTIONS = [
  { text: "How can I improve my tech resume?", icon: FileText },
  { text: "What are the most in-demand web dev skills?", icon: Briefcase },
  { text: "Tips for acing a behavioral interview", icon: MessageSquareQuote },
  { text: "How do I stand out as an entry-level candidate?", icon: Lightbulb },
];

// Helper to format basic markdown (headings, bold, bullets) cleanly
const formatInline = (str) => {
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const renderMessageContent = (text, isUser) => {
  if (!text) return null;
  if (isUser) {
    return <p className="whitespace-pre-wrap break-words">{text}</p>;
  }

  const lines = text.split("\n");
  return lines.map((line, idx) => {
    if (line.startsWith("### ")) {
      return (
        <h4 key={idx} className="font-bold text-slate-900 text-sm mt-2 mb-1">
          {line.replace("### ", "")}
        </h4>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h3 key={idx} className="font-bold text-slate-900 text-sm sm:text-base mt-3 mb-1">
          {line.replace("## ", "")}
        </h3>
      );
    }
    if (line.startsWith("# ")) {
      return (
        <h2 key={idx} className="font-extrabold text-slate-900 text-base sm:text-lg mt-3 mb-1.5">
          {line.replace("# ", "")}
        </h2>
      );
    }
    if (line.startsWith("* ") || line.startsWith("- ")) {
      return (
        <div key={idx} className="flex items-start gap-2 my-1 pl-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
          <span className="text-slate-800 leading-relaxed">
            {formatInline(line.substring(2))}
          </span>
        </div>
      );
    }
    if (!line.trim()) {
      return <div key={idx} className="h-1.5" />;
    }
    return (
      <p key={idx} className="my-0.5 leading-relaxed text-slate-800">
        {formatInline(line)}
      </p>
    );
  });
};

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm HireFlow AI, your personal career and recruitment advisor. Ask me anything about resume building, interview preparation, or career growth!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend = message) => {
    const query = textToSend.trim();
    if (!query || loading) return;

    const userMessage = {
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      // Prepare previous conversation history context (excluding greeting if desired or whole turns)
      const historyPayload = messages.map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const res = await api.post("/chat", {
        message: query,
        history: historyPayload,
      });

      const reply =
        res.data?.reply ||
        res.data?.output ||
        res.data?.response ||
        (typeof res.data === "string" ? res.data : "I'm here to help with your career questions!");

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      console.error("AI Chatbot Error:", err);
      const errorMessage =
        err.response?.data?.reply ||
        err.response?.data?.message ||
        "I encountered an issue connecting to the AI career mentor. Please try again shortly.";

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: errorMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden selection:bg-blue-500/20">
      {/* Sticky Navbar */}
      <div className="flex-shrink-0 z-50">
        <StudentNavbar />
      </div>

      {/* Main Chat Workspace */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-5 flex flex-col min-h-0">
        <div className="flex-1 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col min-h-0 overflow-hidden">
          
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-slate-50/70 to-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-heading">
                    HireFlow AI Assistant
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    AI Advisor
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Real-time career guidance & application optimization
                </p>
              </div>
            </div>

            {/* Online Status */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="hidden sm:inline">Active Online</span>
            </div>
          </div>

          {/* Messages Area - Full Height without blocked space */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scroll-smooth bg-slate-50/30">
            {messages.map((msg, index) => {
              const isUser = msg.sender === "user";
              return (
                <div key={index}>
                  <div
                    className={`flex items-end gap-2.5 ${isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-200`}
                  >
                    {!isUser && (
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={`max-w-[90%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                        isUser
                          ? "bg-blue-600 text-white shadow-sm rounded-br-xs"
                          : "bg-white text-slate-800 border border-slate-200/80 shadow-xs rounded-bl-xs"
                      }`}
                    >
                      {renderMessageContent(msg.text, isUser)}

                      {msg.timestamp && (
                        <span
                          className={`block text-[10px] mt-1.5 text-right ${
                            isUser ? "text-blue-200" : "text-slate-400"
                          }`}
                        >
                          {msg.timestamp}
                        </span>
                      )}
                    </div>

                    {isUser && (
                      <div className="w-7 h-7 rounded-lg bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold flex-shrink-0">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Suggested Prompts: Placed naturally inside message feed only on welcome state */}
                  {index === 0 && messages.length === 1 && (
                    <div className="pt-4 pl-9 pr-2 animate-in fade-in duration-300">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                        Suggested questions to get started:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl">
                        {SUGGESTIONS.map((item, i) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={i}
                              onClick={() => handleSend(item.text)}
                              className="flex items-center gap-2.5 p-3 rounded-xl bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 hover:border-blue-300 text-xs font-medium text-left transition-all shadow-xs group"
                            >
                              <Icon className="w-4 h-4 text-blue-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                              <span className="leading-snug">{item.text}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-white border border-slate-200/80 shadow-xs rounded-2xl px-4 py-2.5 text-xs text-slate-500 flex items-center gap-2">
                  <span>AI is thinking</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Clean Bottom Input Bar - 100% Unobstructed */}
          <div className="p-3 sm:p-4 border-t border-slate-100 bg-white flex-shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Ask HireFlow AI anything about your career..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={loading}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm pl-4 pr-10 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={!message.trim() || loading}
                className="p-2.5 sm:p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center flex-shrink-0"
                aria-label="Send message"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;