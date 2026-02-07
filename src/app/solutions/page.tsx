import { getSolutions } from "@/app/actions/solutions";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Link as LinkIcon, Shield, Zap, BarChart, Globe, Briefcase, Users, Layout, Database } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const iconMap: any = {
    Brain, Link: LinkIcon, Shield, Zap, BarChart, Globe, Briefcase, Users, Layout, Database
};

import { getPageContent } from "@/app/actions/pages";

export default async function SolutionsPage() {
    const solutions = await getSolutions();
    const headerContent = await getPageContent("solutions_header");

    return (
        <div className="min-h-screen flex flex-col bg-[#020617] text-white relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 opacity-60" />

            <Navbar />

            <main className="flex-1 py-24 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <Badge variant="outline" className="mb-4 border-amber-500/50 text-amber-300 bg-amber-500/10">
                            {headerContent.subtitle || "Enterprise Solutions"}
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-amber-100">
                            {headerContent.title}
                        </h1>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            {headerContent.description}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {solutions.map((solution: any) => {
                            const Icon = iconMap[solution.icon] || Zap;
                            return (
                                <Link key={solution.id} href={`/solutions/${solution.slug}`} className="group block h-full">
                                    <Card className="h-full bg-white/5 border-white/10 transition-all duration-300 hover:border-amber-500/50 hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-[0_0_20px_-10px_rgba(245,158,11,0.3)]">
                                        <CardHeader>
                                            <div className={`h-12 w-12 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <CardTitle className="text-xl text-white group-hover:text-amber-400 transition-colors">
                                                {solution.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="text-slate-400 mb-6 line-clamp-3">
                                                {solution.description}
                                            </CardDescription>
                                            <div className="flex items-center text-sm font-medium text-amber-500 group-hover:text-amber-400">
                                                Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}

                        {solutions.length === 0 && (
                            <div className="col-span-full text-center py-24 border border-dashed border-white/10 rounded-3xl bg-white/5">
                                <p className="text-slate-400 text-lg">No specific solutions listed yet.</p>
                                <p className="text-slate-600 text-sm mt-2">Check back soon for industry-specific use cases.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
