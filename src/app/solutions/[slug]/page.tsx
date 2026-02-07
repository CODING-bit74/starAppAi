import { getSolutionBySlug } from "@/app/actions/solutions";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Brain, Link as LinkIcon, Shield, Zap, BarChart, Globe, Briefcase, Users, Layout, Database } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const iconMap: any = {
    Brain, Link: LinkIcon, Shield, Zap, BarChart, Globe, Briefcase, Users, Layout, Database
};

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const solution = await getSolutionBySlug(slug);

    if (!solution) {
        notFound();
    }

    const Icon = iconMap[solution.icon] || Zap;

    // Parse features safely
    let features: string[] = [];
    try {
        features = JSON.parse(solution.features);
    } catch {
        features = solution.features ? solution.features.split(',').map((s: string) => s.trim()) : [];
    }
    if (!Array.isArray(features)) features = [String(features)];


    return (
        <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-indigo-600/5 pointer-events-none" />
                <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <Link href="/solutions" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Solutions
                    </Link>

                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6">
                                <Icon className="h-4 w-4" />
                                <span>Industry Solution</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                                {solution.title}
                            </h1>
                            <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
                                {solution.description}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg h-12 px-8">
                                    <Link href="/contact">Get Started</Link>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-lg h-12 px-8">
                                    <Link href="/contact?type=demo">Book Demo</Link>
                                </Button>
                            </div>
                        </div>

                        {/* Feature Sidebar / Card */}
                        <div className="w-full md:w-[400px] bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <h3 className="text-lg font-semibold text-white mb-6">Key Capabilities</h3>
                            <div className="space-y-4">
                                {features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                                        <span className="text-slate-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 bg-black/20">
                <div className="container mx-auto px-4">
                    <article className="prose prose-invert prose-lg max-w-3xl mx-auto">
                        <div dangerouslySetInnerHTML={{ __html: solution.content }} />
                    </article>
                </div>
            </section>

            <Footer />
        </div>
    );
}
