import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function DocsPage({ searchParams }: { searchParams: Promise<{ doc?: string }> }) {
    // Fetch all docs
    // @ts-ignore
    const allDocs = await prisma.doc.findMany({
        orderBy: [
            { category: 'asc' },
            { order: 'asc' }
        ]
    });

    // Group by category
    const docsByCategory: Record<string, typeof allDocs> = {};
    allDocs.forEach((doc: any) => {
        if (!docsByCategory[doc.category]) {
            docsByCategory[doc.category] = [];
        }
        docsByCategory[doc.category].push(doc);
    });

    // Determine active doc
    const { doc: activeSlug } = await searchParams;
    let activeDoc = activeSlug
        ? allDocs.find((d: any) => d.slug === activeSlug)
        : allDocs[0];

    // If no docs exist, handle gracefully
    if (!activeDoc && allDocs.length > 0) {
        activeDoc = allDocs[0];
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#020617] text-white">
            <Navbar />

            {/* Hero Section for Our Story */}
            <div className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F59E0B] to-[#D97706] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
                </div>

                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 mb-6">
                        Our Story
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Building the future of autonomous enterprise intelligence, one block at a time.
                    </p>
                </div>
            </div>

            <div className="flex-1 container mx-auto px-4 py-8 flex gap-12 max-w-7xl">
                {/* Desktop Sidebar - Premium Style */}
                <aside className="hidden lg:block w-72 shrink-0">
                    <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                        <h2 className="text-xl font-bold text-amber-500 mb-6 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                            Chapters
                        </h2>
                        <ScrollArea className="h-[calc(100vh-350px)]">
                            <div className="space-y-8">
                                {Object.entries(docsByCategory).map(([category, items]) => (
                                    <div key={category}>
                                        <h3 className="font-semibold text-slate-400 mb-3 text-xs uppercase tracking-widest border-b border-white/5 pb-2">
                                            {category}
                                        </h3>
                                        <ul className="space-y-2">
                                            {items.map((item: any) => (
                                                <li key={item.id}>
                                                    <Link
                                                        href={`/our-story?doc=${item.slug}`}
                                                        className={cn(
                                                            "group flex items-center w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300",
                                                            activeDoc?.id === item.id
                                                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                                                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                                        )}
                                                    >
                                                        {activeDoc?.id === item.id && (
                                                            <div className="w-1 h-4 bg-amber-500 rounded-full mr-3" />
                                                        )}
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </aside>

                {/* Mobile Navigation Trigger */}
                <div className="lg:hidden mb-6 w-full">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="w-full justify-between border-amber-500/20 bg-amber-500/5 text-amber-400 hover:bg-amber-500/10">
                                <span className="flex items-center gap-2"><Menu className="h-4 w-4" /> Explore Our Story</span>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-[#020617] border-r border-white/10 text-white w-80 p-0">
                            <div className="p-6 border-b border-white/10">
                                <h2 className="text-xl font-bold text-amber-500">Chapters</h2>
                            </div>
                            <div className="p-6">
                                {Object.entries(docsByCategory).map(([category, items]) => (
                                    <div key={category} className="mb-8">
                                        <h3 className="font-semibold text-slate-400 mb-3 text-xs uppercase tracking-widest">
                                            {category}
                                        </h3>
                                        <ul className="space-y-2">
                                            {items.map((item: any) => (
                                                <li key={item.id}>
                                                    <Link
                                                        href={`/our-story?doc=${item.slug}`}
                                                        className={cn(
                                                            "block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                                                            activeDoc?.id === item.id
                                                                ? "bg-amber-500/10 text-amber-400 font-medium"
                                                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                                        )}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="max-w-4xl mx-auto">
                        {activeDoc ? (
                            <div className="relative">
                                {/* Decorator */}
                                <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />

                                <article className="relative bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
                                    <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white border-b border-white/10 pb-8">
                                        {activeDoc.title}
                                    </h1>
                                    <div
                                        className="prose prose-invert prose-lg max-w-none 
                                        prose-headings:text-white prose-headings:font-semibold 
                                        prose-p:text-slate-300 prose-p:leading-relaxed
                                        prose-strong:text-amber-400 
                                        prose-a:text-amber-400 hover:prose-a:text-amber-300
                                        prose-ul:marker:text-amber-500"
                                        dangerouslySetInnerHTML={{ __html: activeDoc.content }}
                                    />
                                </article>
                            </div>
                        ) : (
                            <div className="text-center py-20 text-slate-500 bg-white/5 rounded-3xl border border-white/10">
                                <FileText className="h-16 w-16 mx-auto mb-4 text-slate-700" />
                                <h3 className="text-xl font-medium text-white">Story Not Found</h3>
                                <p className="mt-2">Select a chapter from the sidebar to begin reading.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}

// Helper icon component since we removed the import 
function FileText(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    )
}
