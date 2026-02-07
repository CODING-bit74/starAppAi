"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight, Bot, Database, Globe, Zap, Shield, Cpu, Code, Cloud, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { NetworkBackground } from "@/components/ui/network-background";

// Map string icon names to Lucide components
const IconMap: { [key: string]: any } = {
    Bot, Database, Globe, Zap, Shield, Cpu, Code, Cloud, BarChart
};

interface HeroCardProps {
    id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
}

export function HeroClient({ cards }: { cards: HeroCardProps[] }) {
    return (
        <section className="relative overflow-hidden pt-16 md:pt-24 lg:pt-32 pb-16">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#F59E0B] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
            </div>
            <NetworkBackground />

            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-300 mb-8"
                >
                    <span className="flex h-2 w-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
                    Building the Future of Enterprise AI
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6"
                >
                    Welcome To <br className="hidden sm:block" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 animate-gradient">StarAppAi</span> Convert Your Idea Into Reality
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
                >
                    Automate your business operations with our next-generation AI and Blockchain infrastructure. Secure, scalable, and intelligent solutions for the modern enterprise.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >

                    <Link href="/our-story" passHref>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8 border-amber-500/20 hover:bg-amber-500/10">
                            Read Our Story
                        </Button>
                    </Link>
                </motion.div>

                {/* Floating Stats / Elements visualization */}
                <div className="mt-20 relative mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">


                        {cards.map((card, index) => {
                            const Icon = IconMap[card.icon] || Bot;
                            return (
                                <motion.div
                                    key={card.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                                    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                                >
                                    <Icon className="h-10 w-10 text-amber-400 mb-4" />
                                    <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                                    <p className="text-sm text-slate-400">{card.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#F59E0B] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
            </div>
        </section>
    );
}
