"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Users, Clock, MousePointerClick, Globe } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
    { label: "Total Visitors", value: "142,384", change: "+12.5%", trend: "up", icon: Users },
    { label: "Avg. Session", value: "4m 32s", change: "-2.1%", trend: "down", icon: Clock },
    { label: "Bounce Rate", value: "42.3%", change: "-0.5%", trend: "up", icon: MousePointerClick }, // "up" here means improvement (lower bounce)
    { label: "Active Countries", value: "14", change: "+3", trend: "up", icon: Globe },
];

const trafficData = [45, 62, 55, 78, 90, 85, 95];
const conversionData = [12, 15, 18, 14, 22, 25, 28];

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Analytics</h2>
                <p className="text-muted-foreground">Real-time insights into your platform's performance.</p>
            </div>

            {/* Top Metrics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric, i) => (
                    <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-sm">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-400">{metric.label}</p>
                                <div className="text-2xl font-bold text-white mt-1">{metric.value}</div>
                                <div className={`flex items-center text-xs mt-1 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                                    {metric.trend === 'up' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                                    {metric.change}
                                </div>
                            </div>
                            <div className="p-3 bg-indigo-500/10 rounded-full">
                                <metric.icon className="w-5 h-5 text-indigo-400" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Traffic Chart */}
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Weekly Traffic</CardTitle>
                        <CardDescription>Unique visitors over the last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] flex items-end justify-between gap-4 px-2 pt-8">
                            {trafficData.map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                    className="w-full bg-gradient-to-t from-indigo-500/50 to-indigo-400 rounded-t relative group"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {h * 100}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 mt-4 px-2">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Engagement Chart */}
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Conversation Rate</CardTitle>
                        <CardDescription>AI Agent interactions vs. successful outcomes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] flex items-end justify-between gap-4 px-2 pt-8">
                            {conversionData.map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h * 3}%` }} // Scale up for visual
                                    transition={{ duration: 0.8, delay: i * 0.1 + 0.5 }}
                                    className="w-full bg-gradient-to-t from-cyan-500/50 to-cyan-400 rounded-t relative group"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {h}%
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 mt-4 px-2">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
