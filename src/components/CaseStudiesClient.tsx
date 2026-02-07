"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function CaseStudiesClient({ studies }: { studies: any[] }) {
    // Fallback icon logic if needed, or just use a default one
    const getIcon = (index: number) => {
        const icons = [TrendingUp, Users, Clock, Zap];
        return icons[index % icons.length];
    }

    return (
        <section id="solutions" className="py-24 relative overflow-hidden bg-[#020617]">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-amber-500/20 to-transparent" />
            <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-amber-500/20 to-transparent" />

            {/* Background gradient blob */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                            Built for Impact
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-xl">
                            See how industry leaders are transforming their operations with our technology.
                        </p>
                    </div>
                    {/* Redirect "stories" to projects section for now */}
                    <Button asChild variant="outline" className="hidden md:flex">
                        <Link href="/case-studies">
                            View all stories <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {studies.slice(0, 3).map((study: any, index: number) => {
                        const Icon = getIcon(index);
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link href={`/case-studies/${study.slug}`} className="block h-full">
                                    <Card className="bg-white/5 border-white/10 h-full flex flex-col hover:border-amber-500/50 hover:bg-white/[0.07] transition-all duration-300 cursor-pointer group hover:shadow-[0_0_20px_-10px_rgba(245,158,11,0.3)]">
                                        <CardHeader>
                                            <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <div className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-2">{study.company}</div>
                                            <CardTitle className="text-xl text-white group-hover:text-amber-400 transition-colors">{study.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <CardDescription className="text-slate-400 text-base mb-6 leading-relaxed">
                                                {study.description}
                                            </CardDescription>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-4xl font-bold text-white">{study.metric}</span>
                                                <span className="text-sm text-slate-400">improvement</span>
                                            </div>
                                            <p className="text-sm text-amber-500/80 mt-2 font-medium">{study.result}</p>
                                        </CardContent>
                                        <CardFooter>
                                            <span className="inline-flex items-center text-sm font-medium text-white group-hover:text-amber-400 transition-colors">
                                                Read Case Study <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </motion.div>
                        )
                    })}

                    {studies.length === 0 && (
                        <div className="col-span-3 text-center py-12 text-slate-500">
                            No case studies yet. Admin can add them.
                        </div>
                    )}
                </div>

                <div className="mt-8 md:hidden">
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/case-studies">
                            View all stories <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
