"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Link from "next/link";

export function BlogList({ posts }: { posts: any[] }) {
    const [visibleCount, setVisibleCount] = useState(6);

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + 3, posts.length));
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(0, visibleCount).map((post) => {
                    // Handle date formatting
                    const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });

                    // Handle image class or url
                    // Initial mock data used classes (bg-gradient...), DB might have URL or class
                    // We'll support both or fallback
                    const imageCheck = post.coverImage || "bg-gradient-to-br from-indigo-500/20 to-purple-500/20";
                    const isUrl = imageCheck.startsWith('http') || imageCheck.startsWith('/');

                    return (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 flex flex-col overflow-hidden h-full">
                                <div className={`h-48 w-full relative overflow-hidden ${!isUrl ? imageCheck : ''}`}>
                                    {isUrl && (
                                        <img src={imageCheck} alt={post.title} className="object-cover w-full h-full" />
                                    )}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                </div>
                                <CardHeader>
                                    <div className="flex justify-between items-center mb-2">
                                        <Badge variant="secondary" className="bg-white/10 hover:bg-white/20 text-indigo-300 border-none">
                                            {post.category}
                                        </Badge>
                                        <div className="flex items-center text-xs text-slate-500">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl text-white group-hover:text-indigo-400 transition-colors line-clamp-2">
                                        {post.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-slate-400 text-sm line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto">
                                    <div className="flex items-center text-xs text-slate-500">
                                        <User className="h-3 w-3 mr-1" />
                                        {post.author}
                                    </div>
                                    <div className="flex items-center text-xs text-slate-500">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {formattedDate}
                                    </div>
                                </CardFooter>
                            </Card>
                        </Link>
                    )
                })}
            </div>

            {visibleCount < posts.length && (
                <div className="mt-16 flex justify-center">
                    <Button
                        variant="outline"
                        className="text-slate-400 hover:text-white border-white/10 hover:bg-white/5"
                        onClick={handleLoadMore}
                    >
                        Load More Articles <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )}
        </>
    );
}
