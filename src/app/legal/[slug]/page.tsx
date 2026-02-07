import { getLegalDoc } from "@/app/actions/legal";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { notFound } from "next/navigation";

export default async function LegalDocPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const doc = await getLegalDoc(slug);

    if (!doc) {
        return (
            <div className="min-h-screen flex flex-col bg-[#020617] text-white">
                <Navbar />
                <main className="flex-1 py-24 container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4 capitalize bg-clip-text text-transparent bg-gradient-to-b from-white to-amber-100">{slug.replace('-', ' ')}</h1>
                    <p className="text-slate-400">This document has not been published yet.</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#020617] text-white relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3 opacity-60" />

            <Navbar />

            <main className="flex-1 py-24 relative z-10">
                <div className="container mx-auto px-4 max-w-3xl">
                    <article className="prose prose-invert prose-lg prose-headings:text-white prose-a:text-amber-400 hover:prose-a:text-amber-300 prose-strong:text-amber-500 prose-blockquote:border-l-amber-500 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg">
                        <div dangerouslySetInnerHTML={{ __html: doc.content }} />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
