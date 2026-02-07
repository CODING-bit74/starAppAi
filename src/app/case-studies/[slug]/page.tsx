import { getCaseStudyBySlug } from "@/app/actions/case-studies";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const study = await getCaseStudyBySlug(slug);

    if (!study) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white">
            <Navbar />

            <main className="pt-24 pb-16">
                <article className="container mx-auto px-4 max-w-4xl">
                    <Link href="/#solutions" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Case Studies
                    </Link>

                    <header className="mb-12 text-center">
                        <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-4">
                            {study.company}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            {study.title}
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            {study.description}
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                            <div className="text-4xl font-bold text-indigo-400 mb-2">{study.metric}</div>
                            <div className="text-sm text-slate-400 font-medium tracking-wide uppercase">Impact Metric</div>
                        </div>
                        <div className="col-span-1 md:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center">
                            <div>
                                <div className="text-lg font-semibold text-white mb-1">Key Result</div>
                                <div className="text-slate-300">{study.result}</div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="prose prose-invert prose-indigo max-w-none 
                        prose-headings:text-white prose-p:text-slate-300 prose-strong:text-white
                        prose-a:text-indigo-400 hover:prose-a:text-indigo-300"
                        dangerouslySetInnerHTML={{ __html: study.content }}
                    />
                </article>

                <div className="container mx-auto px-4 max-w-4xl mt-16 pt-16 border-t border-white/10 text-center">
                    <h2 className="text-2xl font-bold mb-6">Ready to achieve similar results?</h2>
                    <Link href="/pricing" passHref>
                        <Button size="lg" variant="premium">
                            Start Your Journey
                        </Button>
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
