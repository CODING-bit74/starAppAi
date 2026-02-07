"use client";

import { useEffect, useState } from "react";
// import { PROJECTS_DATA } from "@/lib/projects-data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Smartphone, Laptop, Tablet, Monitor, RotateCcw, Wifi, Battery, Signal } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function DemoClient({ project }: { project: any }) {
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<"mobile" | "tablet" | "laptop" | "desktop">("desktop");
    const [activeTab, setActiveTab] = useState("Home");

    useEffect(() => {
        // Set initial view mode based on project type
        if (project?.demoConfig?.type === "mobile") {
            setViewMode("mobile");
        } else {
            setViewMode("desktop");
        }

        // Simulate fake loading
        setTimeout(() => setIsLoading(false), 1500);
    }, [project]);


    if (!project && !isLoading) {
        // Handle not found in parent or redirect
        return null;
    }

    if (!project) return <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white">Loading demo environment...</div>;

    // We still use isMobileContent to determine *what* to render inside the frame
    // But the frame size itself is controlled by viewMode
    const isMobileContent = project.demoConfig?.type === "mobile";

    const getFrameDimensions = () => {
        switch (viewMode) {
            case "mobile": return "w-[375px] h-[812px] rounded-[3rem]";
            case "tablet": return "w-[768px] h-[1024px] rounded-[2rem]";
            case "laptop": return "w-[1024px] h-[768px] rounded-[1.5rem]";
            case "desktop": return "w-full max-w-[1600px] h-[85vh] rounded-[1rem]";
            default: return "w-full h-full";
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0B0F19] overflow-hidden">

            {/* Header Bar */}
            <div className="border-b border-white/10 bg-[#0B0F19]/50 backdrop-blur-md z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={`/projects/${project.slug}`} className="text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div className="h-6 w-px bg-white/10 mx-2" />
                        <h1 className="text-sm font-semibold text-white uppercase tracking-wider">
                            Live Preview: <span className="text-indigo-400">{project.title}</span>
                        </h1>
                        <Badge variant="outline" className="ml-2 border-green-500/20 text-green-400 bg-green-500/10 animate-pulse">
                            ● Live
                        </Badge>
                    </div>

                    {/* Device Switcher */}
                    <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
                        <button
                            onClick={() => setViewMode("mobile")}
                            className={`p-2 rounded-md transition-all ${viewMode === "mobile" ? "bg-indigo-500 text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                            title="Mobile (375px)"
                        >
                            <Smartphone className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode("tablet")}
                            className={`p-2 rounded-md transition-all ${viewMode === "tablet" ? "bg-indigo-500 text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                            title="Tablet (768px)"
                        >
                            <Tablet className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode("laptop")}
                            className={`p-2 rounded-md transition-all ${viewMode === "laptop" ? "bg-indigo-500 text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                            title="Laptop (1024px)"
                        >
                            <Laptop className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode("desktop")}
                            className={`p-2 rounded-md transition-all ${viewMode === "desktop" ? "bg-indigo-500 text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                            title="Desktop (Full)"
                        >
                            <Monitor className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button size="sm" variant="outline" onClick={() => setIsLoading(true)}>
                            <RotateCcw className="h-4 w-4 mr-2" /> Restart
                        </Button>
                    </div>
                </div>
            </div>

            <main className="flex-1 relative flex items-center justify-center p-8 bg-grid-white/[0.02] overflow-auto">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] via-transparent to-[#0B0F19] pointer-events-none" />

                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="relative h-16 w-16">
                                <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full animate-ping" />
                                <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin" />
                            </div>
                            <p className="text-slate-400 text-sm animate-pulse">Booting environment...</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="demo"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                            className={`relative transition-all duration-500 shadow-2xl border-8 border-[#1a1f2e] bg-[#0B0F19] overflow-hidden ring-1 ring-white/10 ${getFrameDimensions()}`}
                        >
                            {/* Render content based on project type AND view mode compatibility */}
                            {/* For simplicity in this demo, we verify "Mobile Content" vs "Web Content" */}

                            {isMobileContent ? (
                                // Mobile App Interface
                                <div className="h-full flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-white relative">
                                    {/* Notch - Only show on mobile view */}
                                    {viewMode === 'mobile' && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-[#1a1f2e] rounded-b-2xl z-20" />
                                    )}

                                    {/* Status Bar */}
                                    <div className="h-12 flex items-center justify-between px-6 pt-2 text-xs font-medium z-10 shrink-0">
                                        <span>9:41</span>
                                        <div className="flex items-center gap-1.5">
                                            <Signal className="h-3 w-3" />
                                            <Wifi className="h-3 w-3" />
                                            <Battery className="h-3 w-3" />
                                        </div>
                                    </div>

                                    {/* App Header */}
                                    <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 shrink-0">
                                        <h2 className="font-bold text-lg tracking-tight">{project.title}</h2>
                                        <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800" />
                                    </div>

                                    {/* Fake Content - Feed */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                                        <div className="h-40 rounded-2xl bg-indigo-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-500/20">
                                            New Arrivals 👟
                                        </div>
                                        <div className={`grid gap-4 ${viewMode === 'mobile' ? 'grid-cols-2' : 'grid-cols-3 md:grid-cols-4'}`}>
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                                <div key={i} className="aspect-[3/4] rounded-xl bg-gray-50 dark:bg-gray-800 relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-3">
                                                        <div className="text-white font-medium text-sm">Product {i}</div>
                                                        <div className="text-white/80 text-xs">$129.00</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Nav */}
                                    <div className="h-20 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800 flex items-center justify-around pb-4 shrink-0">
                                        {["Home", "Search", "Cart", "Profile"].map(tab => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${activeTab === tab ? 'text-indigo-500' : 'text-slate-400'}`}
                                            >
                                                <div className={`h-6 w-6 rounded-full ${activeTab === tab ? 'bg-indigo-500/10' : ''}`} />
                                                {tab}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Home Indicator */}
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 dark:bg-white/20 rounded-full" />
                                </div>
                            ) : (
                                // Dashboard/Web Interface
                                <div className="h-full flex flex-col bg-[#0f172a]">
                                    {/* Browser Address Bar */}
                                    <div className="h-10 bg-[#1e293b] flex items-center px-4 gap-4 border-b border-indigo-500/10 shrink-0">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                        </div>
                                        <div className="flex-1 bg-[#0f172a] h-7 rounded-md flex items-center px-3 text-xs text-slate-500 font-mono">
                                            https://app.demo.io/{project.slug}
                                        </div>
                                    </div>

                                    {/* Tool Bar */}
                                    <div className="h-14 border-b border-indigo-500/10 flex items-center justify-between px-6 bg-[#0f172a] shrink-0">
                                        <div className="flex items-center gap-3">
                                            <project.icon className={`h-6 w-6 ${project.color}`} />
                                            <span className="font-bold text-white text-lg">{project.title}</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <Button size="sm" variant="secondary" className="bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border-0">
                                                <Play className="h-3 w-3 mr-2" /> Run Analysis
                                            </Button>
                                            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
                                        </div>
                                    </div>

                                    {/* Dashboard Grid */}
                                    <div className="flex-1 p-6 overflow-y-auto">
                                        <div className={`grid gap-6 ${viewMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-12'}`}>
                                            {/* Sidebar */}
                                            <div className={`${viewMode === 'mobile' ? 'col-span-1 flex overflow-x-auto gap-4 pb-2' : 'col-span-2 space-y-2'}`}>
                                                {["Overview", "Analytics", "Reports", "Settings"].map(item => (
                                                    <div key={item} className={`rounded-lg hover:bg-white/5 flex items-center px-4 text-sm text-slate-400 cursor-pointer transition-colors ${viewMode === 'mobile' ? 'h-8 bg-white/5 whitespace-nowrap' : 'h-10'}`}>
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Main Content */}
                                            <div className={`${viewMode === 'mobile' ? 'col-span-1' : 'col-span-10'} grid ${viewMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-3'} gap-6`}>
                                                {/* Fake Charts */}
                                                <div className={`${viewMode === 'mobile' ? 'col-span-1' : 'col-span-2'} h-64 bg-[#1e293b]/50 rounded-xl border border-white/5 p-4 relative overflow-hidden group`}>
                                                    <div className="mb-4 text-sm text-slate-400">Total Activity</div>
                                                    <div className="flex items-end justify-between h-40 gap-2">
                                                        {[40, 70, 45, 90, 65, 85, 55, 95, 75, 60].map((h, i) => (
                                                            <div key={i} className="w-full bg-indigo-500/20 rounded-t-sm relative group-hover:bg-indigo-500/30 transition-colors" style={{ height: `${h}%` }}>
                                                                <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="col-span-1 h-64 bg-[#1e293b]/50 rounded-xl border border-white/5 p-4">
                                                    <div className="text-sm text-slate-400 mb-4">System Status</div>
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-white">CPU Usage</span>
                                                            <span className="text-green-400">24%</span>
                                                        </div>
                                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                            <div className="h-full w-1/4 bg-green-500" />
                                                        </div>

                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-white">Memory</span>
                                                            <span className="text-yellow-400">62%</span>
                                                        </div>
                                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                            <div className="h-full w-2/3 bg-yellow-500" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Recent Items */}
                                                <div className={`${viewMode === 'mobile' ? 'col-span-1' : 'col-span-3'} bg-[#1e293b]/50 rounded-xl border border-white/5 p-4 min-h-[200px]`}>
                                                    <div className="text-sm text-slate-400 mb-4">Recent Transactions</div>
                                                    <div className="space-y-2">
                                                        {[1, 2, 3].map(i => (
                                                            <div key={i} className="h-12 border-b border-white/5 flex items-center justify-between text-sm">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-8 w-8 rounded bg-indigo-500/20" />
                                                                    <span className="text-white">Transaction #{1000 + i}</span>
                                                                </div>
                                                                <span className="text-slate-500">Just now</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
