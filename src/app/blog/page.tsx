import { getPublishedPosts } from "@/app/actions/posts";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default async function BlogArchivePage() {
    const posts = await getPublishedPosts();

    return (
        <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3 opacity-60" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3" />

            <Navbar />

            <main className="pt-32 pb-24 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-3 block">Our Blog</span>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-amber-100">
                            Latest Insights
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Analysis, trends, and thoughts on the future of autonomous agents and AI.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {posts.map((post: any) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="block h-full group">
                                <Card className="bg-white/5 border-white/10 h-full flex flex-col hover:border-amber-500/50 hover:bg-white/[0.07] transition-all duration-300 cursor-pointer group overflow-hidden hover:-translate-y-1 hover:shadow-[0_0_20px_-10px_rgba(245,158,11,0.3)]">
                                    {post.coverImage && (
                                        <div className="h-48 w-full overflow-hidden border-b border-white/5 relative">
                                            <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <CardHeader>
                                        <div className="flex items-center gap-2 text-xs text-amber-500 mb-4 font-bold uppercase tracking-wide">
                                            <span>{post.category}</span>
                                            <span className="text-white/20">•</span>
                                            <span className="text-slate-400">{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
                                        </div>
                                        <CardTitle className="text-xl text-white group-hover:text-amber-400 transition-colors leading-snug">
                                            {post.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <CardDescription className="text-slate-400 text-base line-clamp-3 leading-relaxed">
                                            {post.excerpt}
                                        </CardDescription>
                                    </CardContent>
                                    <CardFooter className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <div className="h-5 w-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold text-[10px]">
                                                {post.author.charAt(0)}
                                            </div>
                                            {post.author}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Clock className="h-3 w-3" /> {post.readTime}
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))}

                        {posts.length === 0 && (
                            <div className="col-span-3 text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10 backdrop-blur-sm">
                                <h3 className="text-xl font-medium text-white mb-2">No posts yet</h3>
                                <p className="text-slate-400">Our writers are busy crafting the next big insight.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
