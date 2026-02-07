import { getCaseStudies } from "@/app/actions/case-studies";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Clock, Zap, FileText } from "lucide-react";
import Link from "next/link";

export default async function CaseStudiesArchivePage() {
    const studies = await getCaseStudies();

    // Fallback icon logic
    const getIcon = (index: number) => {
        const icons = [TrendingUp, Users, Clock, Zap, FileText];
        return icons[index % icons.length];
    }

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white">
            <Navbar />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Success Stories
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Explore how we've helped leading companies transform their operations with autonomous AI agents.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {studies.map((study: any, index: number) => {
                            const Icon = getIcon(index);
                            return (
                                <Link key={study.id} href={`/case-studies/${study.slug}`} className="block h-full">
                                    <Card className="bg-white/5 border-white/10 h-full flex flex-col hover:bg-white/10 transition-colors cursor-pointer group">
                                        <CardHeader>
                                            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-500/20 text-indigo-400">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <div className="text-sm font-medium text-indigo-400 mb-2">{study.company}</div>
                                            <CardTitle className="text-xl text-white group-hover:text-indigo-300 transition-colors">{study.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <CardDescription className="text-slate-400 text-base mb-6">
                                                {study.description}
                                            </CardDescription>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-bold text-white">{study.metric}</span>
                                                <span className="text-sm text-muted-foreground">improvement</span>
                                            </div>
                                            <p className="text-sm text-indigo-300 mt-1">{study.result}</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button variant="link" className="px-0 text-white group-hover:text-indigo-400">
                                                Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            )
                        })}

                        {studies.length === 0 && (
                            <div className="col-span-3 text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                                <FileText className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                                <h3 className="text-xl font-medium text-white mb-2">No stories yet</h3>
                                <p className="text-slate-400">Check back soon for new case studies.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
