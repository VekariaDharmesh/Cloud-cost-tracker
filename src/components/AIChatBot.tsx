"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  X, 
  Send, 
  Trash2,
  HelpCircle
} from "lucide-react";

export default function AIChatBot() {
  const { chatMessages, sendChatMessage, clearChat, addActivity } = useApp();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleToggle = () => {
      setOpen((prev) => !prev);
    };

    window.addEventListener("toggle-nebula-chat", handleToggle);
    return () => window.removeEventListener("toggle-nebula-chat", handleToggle);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const query = input;
    setInput("");
    setIsTyping(true);

    sendChatMessage(query);

    setTimeout(() => {
      setIsTyping(false);
    }, 800);
  };

  const handleSuggest = (text: string) => {
    setInput(text);
    setTimeout(() => {
      handleSend();
    }, 50);
  };

  const suggestedPrompts = [
    "How can I save on AWS?",
    "Explain my storage budgets overruns",
    "Analyze GCP cost spike",
    "Where is compute waste?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end font-sans">
      {/* Floating Chat Overlay panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[350px] sm:w-[380px] h-[480px] rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-2xl flex flex-col mb-3.5 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4.5 py-3 border-b border-[var(--border)] bg-stone-50/50 dark:bg-slate-900/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-[var(--border)] flex items-center justify-center shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[var(--foreground)] leading-none">
                    Nebula AI Assistant
                  </h3>
                  <span className="text-[8px] text-emerald-600 font-bold uppercase tracking-wider mt-1 block">FinOps Consultant Ready</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    clearChat();
                    addActivity("Cleared conversation ledger", "trash");
                  }}
                  className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-400 hover:text-red-500 transition-colors"
                  title="Clear Chat Logs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-400 hover:text-[var(--foreground)] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Conversation Logs */}
            <div className="flex-1 p-4.5 overflow-y-auto space-y-3.5 bg-[var(--card)]">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-tr-none shadow-sm" 
                      : "bg-stone-50 dark:bg-slate-900/40 border border-[var(--border)] text-[var(--foreground)] rounded-tl-none whitespace-pre-line"
                  }`}>
                    {msg.text}
                    {msg.sender === "ai" && (
                      <span className="text-[7.5px] text-stone-400 mt-2 block text-right font-mono">{msg.timestamp}</span>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-stone-50 dark:bg-slate-900/40 border border-[var(--border)] rounded-xl rounded-tl-none px-3.5 py-2.5 text-xs text-stone-400 flex items-center gap-1.5 shadow-sm">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.15s' }}>●</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>●</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Suggetions bubbles */}
            {chatMessages.length <= 1 && !isTyping && (
              <div className="px-4.5 py-2.5 border-t border-[var(--border)] bg-stone-50/20 dark:bg-slate-900/5">
                <p className="text-[8.5px] text-stone-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                  <HelpCircle className="w-2.5 h-2.5 text-blue-500" />
                  <span>Suggested Prompts</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSuggest(prompt)}
                      className="px-2.5 py-1 rounded-lg bg-stone-50 dark:bg-slate-900 hover:bg-stone-100 dark:hover:bg-slate-800 border border-[var(--border)] text-[9px] text-stone-500 hover:text-[var(--foreground)] transition-all cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messaging text field */}
            <div className="p-3 border-t border-[var(--border)] bg-stone-50/40 dark:bg-slate-900/20 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[var(--border)] focus:border-blue-500 focus:outline-none text-xs text-[var(--foreground)]"
                placeholder="Ask Nebula AI cloud optimization questions..."
              />
              <button
                onClick={handleSend}
                className="p-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-stone-150 transition-colors shadow-sm cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating core launcher bubble */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-[var(--border)] flex items-center justify-center shadow-lg hover:scale-105 transition-all relative group"
        title="Nebula AI Consultant (Press C)"
      >
        <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
        <span className="absolute right-14 scale-0 group-hover:scale-100 bg-[var(--card)] border border-[var(--border)] text-[9px] text-[var(--foreground)] font-semibold uppercase px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl transition-all origin-right">
          Nebula AI Consultant <span className="text-stone-400 font-mono ml-1 font-normal">Press C</span>
        </span>
      </button>
    </div>
  );
}
