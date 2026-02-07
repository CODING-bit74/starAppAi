"use client";

import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock, Shield, Globe, Zap } from "lucide-react";

export default function StoriesPage() {
    const allStories = [
        {
            company: "FinTech Global",
            title: "Automating DeFi Compliance",
            result: "Reduced audit time by 75%",
            icon: TrendingUp,
            description: "Implemented an autonomous agent swarm to monitor real-time transaction flows and ensure regulatory compliance.",
            tags: ["Finance", "AI", "Compliance"]
        },
        {
            company: "HealthCore Systems",
            title: "Patient Data Sovereignty",
            result: "Secured 1M+ patient records",
            icon: Users,
            description: "Deployed a private permissioned blockchain for secure, patient-controlled health data exchange.",
            tags: ["Healthcare", "Blockchain", "Privacy"]
        },
        {
            company: "LogisticsAI",
            title: "Supply Chain Optimization",
            result: "Saved 2000+ man-hours/month",
            icon: Clock,
            description: "Built a predictive logistics engine using RAG to analyze historical shipping data.",
            tags: ["Logistics", "RAG", "Automation"]
        },
        {
            company: "SecureNet",
            title: "Network Intrusion Prevention",
            result: "Stopped 99.9% of attacks",
            icon: Shield,
            description: "AI-driven security sentinel that adapts to new threat vectors in real-time.",
            tags: ["Cybersecurity", "AI", "Infrastructure"]
        },
        {
            company: "GreenEnergy",
            title: "Grid Load Balancing",
            result: "15% Energy Savings",
            icon: Zap,
            description: "Smart contract system for peer-to-peer energy trading and load distribution.",
            tags: ["Energy", "Smart Contracts", "IoT"]
        },
        {
            company: "GlobalTrade ",
            title: "Cross-Border Payments",
            result: "Instant Settlement",
            icon: Globe,
            description: "Stablecoin-based settlement layer reducing friction in international trade.",
            tags: ["FinTech", "Web3", "Payments"]
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#0B0F19]">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-24">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white mb-6">
                        Success Stories
                    </h1>
                    <p className="text-lg text-slate-400">
                        Discover how organizations are leveraging StarApp.AI to drive innovation and growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allStories.map((story, index) => (
                        <Card key={index} className="bg-white/5 border-white/10 hover:border-indigo-500/50 transition-colors">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                                        <story.icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-xs font-medium text-slate-400">{story.company}</span>
                                </div>
                                <CardTitle className="text-xl text-white">{story.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-slate-400 mb-4">{story.description}</CardDescription>
                                <div className="mb-4">
                                    <span className="text-lg font-bold text-green-400">{story.result}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {story.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="bg-white/10 text-indigo-200">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
