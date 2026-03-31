"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiX, FiMessageSquare, FiZap } from "react-icons/fi";

type Message = {
  role: "user" | "assistant";
  text: string;
};

const SUGGESTED = [
  "What projects have you built?",
  "What tech do you use?",
  "Can you build my app?",
  "Tell me about FlowMind AI",
  "Are you available for hire?",
];

export default function AIChatAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hey! I'm HK AI — Hari Krishnaa's portfolio assistant. Ask me about his projects, tech stack, or how to hire him. ⚡",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply ?? "Sorry, I couldn't process that right now." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Hmm, something went wrong. Try again or email krishnaahari05@gmail.com directly." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-[9990] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.85) 0%, rgba(6,182,212,0.75) 100%)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(139,92,246,0.55)",
          boxShadow: "0 0 30px rgba(139,92,246,0.35), 0 8px 32px rgba(0,0,0,0.4)",
        }}
        aria-label="Open AI Chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiX size={22} className="text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiMessageSquare size={22} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Notification dot when closed */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-[74px] right-6 z-[9991] w-3 h-3 rounded-full bg-cyan"
            style={{ boxShadow: "0 0 8px rgba(6,182,212,0.8)" }}
          />
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="fixed bottom-24 right-4 z-[9989] w-[min(380px,calc(100vw-2rem))] flex flex-col rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: "rgba(10, 16, 34, 0.92)",
              backdropFilter: "blur(24px) saturate(160%)",
              border: "1px solid rgba(139,92,246,0.30)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.12)",
              maxHeight: "70vh",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 border-b"
              style={{ borderColor: "rgba(139,92,246,0.20)" }}
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.25))", border: "1px solid rgba(139,92,246,0.4)" }}>
                  <FiZap size={16} style={{ color: "#8b5cf6" }} />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan"
                  style={{ boxShadow: "0 0 6px rgba(6,182,212,0.9)" }} />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-light leading-none">HK AI</p>
                <p className="font-mono text-xs mt-0.5" style={{ color: "#06b6d4" }}>Portfolio Assistant · Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide" style={{ minHeight: 200, maxHeight: "calc(70vh - 160px)" }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-body leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-md"
                        : "rounded-bl-md"
                    }`}
                    style={
                      msg.role === "user"
                        ? { background: "rgba(139,92,246,0.25)", border: "1px solid rgba(139,92,246,0.35)", color: "rgb(248,250,252)" }
                        : { background: "rgba(15,23,42,0.70)", border: "1px solid rgba(71,85,105,0.40)", color: "rgb(203,213,225)" }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div
                    className="px-4 py-3 rounded-2xl rounded-bl-md"
                    style={{ background: "rgba(15,23,42,0.70)", border: "1px solid rgba(71,85,105,0.40)" }}
                  >
                    <div className="flex gap-1.5 items-center h-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: "#8b5cf6" }}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggested prompts */}
            {messages.length <= 1 && (
              <div className="px-4 pb-3 flex gap-2 flex-wrap">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs font-mono px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
                    style={{
                      background: "rgba(139,92,246,0.12)",
                      border: "1px solid rgba(139,92,246,0.28)",
                      color: "#a78bfa",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-t"
              style={{ borderColor: "rgba(139,92,246,0.20)" }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
                placeholder="Ask anything about HK..."
                className="flex-1 bg-transparent text-sm font-body text-light placeholder:text-muted outline-none"
              />
              <motion.button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-40 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, rgba(139,92,246,0.7), rgba(6,182,212,0.6))",
                  border: "1px solid rgba(139,92,246,0.4)",
                }}
              >
                <FiSend size={14} className="text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
