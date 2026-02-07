"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Brain, Link, Shield, Zap, BarChart, Globe } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: any = {
    Brain, Link, Shield, Zap, BarChart, Globe
};

export function Services({ services }: { services: any[] }) {
    // Fallback if no services are in DB yet
    const displayServices = services && services.length > 0 ? services : [];

    return (
        <section id="features" className="py-24 bg-[#020617] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-amber-500/20 to-transparent" />
            <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-amber-500/20 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-3 block">Technology</span>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                        Enterprise-Grade Capabilities
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        We combine cutting-edge AI with secure blockchain infrastructure to build the next generation of software.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayServices.map((service, index) => {
                        const Icon = iconMap[service.icon] || Zap;
                        return (
                            <motion.div
                                key={service.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="bg-white/5 border-white/10 hover:border-amber-500/50 hover:bg-white/[0.07] transition-all duration-300 h-full group hover:shadow-[0_0_20px_-10px_rgba(245,158,11,0.3)]">
                                    <CardHeader>
                                        <div className="h-14 w-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <Icon className="h-7 w-7 text-amber-500" />
                                        </div>
                                        <CardTitle className="text-xl text-white font-bold group-hover:text-amber-400 transition-colors">{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-slate-400 text-base leading-relaxed">
                                            {service.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}

                    {displayServices.length === 0 && (
                        <div className="col-span-full text-center py-12 text-slate-500 bg-white/5 rounded-xl border border-dashed border-white/10">
                            <p>No capabilities defined yet. Add them in the Admin Panel.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
