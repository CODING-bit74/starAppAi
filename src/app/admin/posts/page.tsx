import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash, FileText, Eye, EyeOff } from "lucide-react";
import { getPosts, deletePost } from "@/app/actions/posts";

export default async function AdminPostsPage() {
    const posts = await getPosts();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
                <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                    <Link href="/admin/posts/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Write New Post
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {posts.map((post: any) => (
                    <Card key={post.id} className="bg-white/5 border-white/10">
                        <CardHeader className="flex flex-row items-center justify-between p-6">
                            <div className="space-y-1">
                                <CardTitle className="text-xl text-white flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-indigo-400" />
                                    {post.title}
                                    {post.published ? (
                                        <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                                            <Eye className="h-3 w-3" /> Published
                                        </span>
                                    ) : (
                                        <span className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                                            <EyeOff className="h-3 w-3" /> Draft
                                        </span>
                                    )}
                                </CardTitle>
                                <p className="text-sm text-slate-400">
                                    {post.author} • {post.category} • {post.slug}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button asChild variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                                    <Link href={`/admin/posts/${post.id}`}>
                                        <Edit className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <form action={deletePost.bind(null, post.id)}>
                                    <Button type="submit" variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </form>
                            </div>
                        </CardHeader>
                    </Card>
                ))}

                {posts.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        No posts found. Start writing!
                    </div>
                )}
            </div>
        </div>
    );
}
