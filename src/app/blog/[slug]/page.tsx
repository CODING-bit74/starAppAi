import { getPostBySlug } from "@/app/actions/posts";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/ShareButton";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans antialiased relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3 opacity-60" />

            <Navbar />

            <main className="pt-32 pb-24 relative z-10">
                <article className="container mx-auto px-4 max-w-3xl">
                    <Link href="/blog" className="inline-flex items-center text-slate-500 hover:text-amber-400 mb-8 transition-colors text-sm font-medium">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blog
                    </Link>

                    <header className="mb-12">
                        <div className="flex items-center gap-3 text-xs text-amber-500 font-bold mb-6 uppercase tracking-wider">
                            <span>{post.category}</span>
                            <span className="text-slate-700">•</span>
                            <span className="text-slate-400">{post.readTime}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight text-white">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between border-y border-white/10 py-6">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold">
                                    {post.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-white font-medium">{post.author}</div>
                                    <div className="text-xs text-slate-500">
                                        {format(new Date(post.createdAt), 'MMM d, yyyy')}
                                    </div>
                                </div>
                            </div>
                            <ShareButton title={post.title} />
                        </div>
                    </header>

                    {post.coverImage && (
                        <div className="relative w-full h-[400px] mb-12 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )}

                    {/* Medium-style typography classes - Refined for Gold Theme */}
                    <div
                        className="prose prose-invert prose-lg md:prose-xl max-w-none 
                        font-serif tracking-wide leading-relaxed
                        prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
                        prose-h1:text-4xl prose-h1:mb-8
                        prose-p:text-[#d0d6e0] prose-p:leading-8 prose-p:font-light prose-p:mb-6
                        prose-a:text-amber-400 hover:prose-a:text-amber-300 prose-a:no-underline prose-a:border-b prose-a:border-amber-500/30 hover:prose-a:border-amber-300
                        prose-strong:text-white prose-strong:font-semibold
                        prose-code:text-amber-300 prose-code:font-mono prose-code:text-sm prose-code:bg-amber-950/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                        prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-300
                        prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-10"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className="mt-16 pt-16 border-t border-white/10">
                        <h3 className="text-2xl font-bold mb-6 text-white">Thanks for reading</h3>
                        <p className="text-slate-400 mb-8 max-w-xl">
                            If you enjoyed this article, check out our other insights or subscribe to our newsletter for weekly updates.
                        </p>
                        <Button asChild variant="outline" className="mr-4 border-amber-500/50 text-amber-500 hover:bg-amber-500/10 hover:text-amber-400">
                            <Link href="/blog">Read More</Link>
                        </Button>

                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
