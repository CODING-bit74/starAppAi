"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { playNotificationSound } from "@/lib/sound";
import { getActiveSuggestions } from "@/app/actions/chat-settings";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Send, User, Star } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "user" | "bot";
    content: string;
    timestamp: Date;
}



export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(() => ([
        { id: "1", role: "bot", content: "Hello! I'm StarApp.AI Assistant. I can answer questions about our platform, pricing, or technology. How can I help?", timestamp: new Date() }
    ]));
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [suggestions, setSuggestions] = useState<string[]>([]);

    // Function to fetch dynamic suggestions


    useEffect(() => {
        // Load dynamic suggestions on mount
        getActiveSuggestions().then(data => {
            if (data && data.length > 0) {
                setSuggestions(data.map((s: any) => s.text));
            } else {
                // Fallback suggestions if API fails or returns empty
                setSuggestions([
                    "How much does it cost?",
                    "Show me case studies",
                    "Book a demo"
                ]);
            }
        });
    }, []); // Empty dependency array means this runs once on mount

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) {
                setShowNotification(true);
                playNotificationSound();
            }
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
    }, [isOpen]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (text: string = input) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
                })
            });

            if (!response.ok) throw new Error('Failed to fetch response');

            const data = await response.json();

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: data.content,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error(error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: "I'm having trouble connecting to the server. Please try again later.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-4 z-50 w-[90vw] max-w-[380px] shadow-2xl"
                    >
                        <Card className="h-[600px] flex flex-col border-indigo-500/30 bg-[#0B0F19]/95 backdrop-blur-xl shadow-indigo-500/20">
                            <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-white/10 bg-indigo-500/10">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="relative h-10 w-10 rounded-full overflow-hidden shadow-lg border border-white/10">
                                            <Image
                                                src="/Starappaibot.png"
                                                alt="StarApp Bot"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-[#0B0F19] z-10"></span>
                                    </div>
                                    <div>
                                        <CardTitle className="text-sm font-bold text-white">StarApp.AI Assistant</CardTitle>
                                        <p className="text-xs text-indigo-300">Analysis & Support Agent</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 hover:bg-white/10 text-slate-400">
                                    <X className="h-4 w-4" />
                                </Button>
                            </CardHeader>

                            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                                <div className="text-xs text-center text-slate-500 my-4">Today</div>
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={cn(
                                            "flex gap-3 max-w-[85%]",
                                            msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                                        )}
                                    >
                                        <div className={cn(
                                            "relative h-8 w-8 rounded-full flex-shrink-0 shadow-sm overflow-hidden",
                                            msg.role === "user" ? "bg-slate-700 flex items-center justify-center" : "border border-white/10"
                                        )}>
                                            {msg.role === "user" ? (
                                                <User className="h-4 w-4 text-white" />
                                            ) : (
                                                <Image
                                                    src="/Starappaibot.png"
                                                    alt="Bot"
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className={cn(
                                            "rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm",
                                            msg.role === "user"
                                                ? "bg-indigo-600 text-white rounded-tr-none"
                                                : "bg-[#1A1F2E] border border-white/5 text-slate-200 rounded-tl-none"
                                        )}>
                                            {/* Simple markdown parser for bolding text */}
                                            {msg.content.split('\n').map((line, i) => (
                                                <p key={i} className="mb-1 last:mb-0">
                                                    {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                                                        part.startsWith('**') && part.endsWith('**')
                                                            ? <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>
                                                            : part
                                                    )}
                                                </p>
                                            ))}
                                            <span className="text-[10px] opacity-50 mt-1 block text-right">
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex gap-3 mr-auto max-w-[85%]">
                                        <div className="relative h-8 w-8 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                                            <Image
                                                src="/Starappaibot.png"
                                                alt="Bot"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="bg-[#1A1F2E] border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                )}
                            </CardContent>

                            {/* Suggestions */}
                            {messages.length < 3 && !isTyping && suggestions.length > 0 && (
                                <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
                                    {suggestions.map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            onClick={() => handleSend(suggestion)}
                                            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-colors"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <CardFooter className="p-3 border-t border-white/10 bg-[#0B0F19]">
                                <form
                                    className="flex w-full gap-2 items-center"
                                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                >
                                    <Input
                                        placeholder="Type your message..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="bg-white/5 border-white/10 focus-visible:ring-indigo-500 h-10"
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        variant="secondary"
                                        className={cn(
                                            "h-10 w-10 transition-all duration-300",
                                            input.trim() ? "bg-indigo-600 hover:bg-indigo-500 text-white" : "bg-white/10 text-slate-500"
                                        )}
                                        disabled={!input.trim() || isTyping}
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!isOpen && showNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="fixed bottom-24 right-6 z-50 max-w-[200px]"
                    >
                        <div className="bg-white text-slate-900 text-sm font-medium p-3 rounded-xl rounded-br-sm shadow-xl border border-indigo-100 relative">
                            Hi! I'm StarApp.AI. Tell me how can I help you?
                            <button
                                onClick={(e) => { e.stopPropagation(); setShowNotification(false); }}
                                className="absolute -top-2 -left-2 h-5 w-5 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors"
                            >
                                <X className="h-3 w-3 text-slate-600" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => { setIsOpen(!isOpen); setShowNotification(false); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 text-white ring-2 ring-white/20"
            >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="relative h-10 w-10 rounded-full overflow-hidden"
                    >
                        <Image
                            src="/Starappaibot.png"
                            alt="StarApp Bot"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                )}
            </motion.button>
        </>
    );
}
