import { Button } from "@/components/ui/button";
import { Plus, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePost } from "@/app/actions/admin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminBlogsPage() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Manage Blogs</h2>
                    <p className="text-muted-foreground">Create, edit, and delete blog posts.</p>
                </div>
                <Link href="/admin/blogs/new">
                    <Button variant="premium" className="bg-red-600 hover:bg-red-700 text-white">
                        <Plus className="mr-2 h-4 w-4" /> New Post
                    </Button>
                </Link>
            </div>

            <div className="border border-white/10 rounded-lg bg-white/5 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/10 hover:bg-white/5">
                            <TableHead className="text-slate-400">Title</TableHead>
                            <TableHead className="text-slate-400">Category</TableHead>
                            <TableHead className="text-slate-400">Author</TableHead>
                            <TableHead className="text-slate-400">Status</TableHead>
                            <TableHead className="text-right text-slate-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                                    No blog posts found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            posts.map((post) => (
                                <TableRow key={post.id} className="border-white/10 hover:bg-white/5">
                                    <TableCell className="font-medium text-white">{post.title}</TableCell>
                                    <TableCell className="text-slate-400">{post.category}</TableCell>
                                    <TableCell className="text-slate-400">{post.author}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-green-400 border-green-500/20 bg-green-500/10">
                                            Published
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/blog/${post.slug}`} target="_blank">
                                                <Button variant="ghost" size="icon" className="hover:bg-blue-500/10 hover:text-blue-400">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <form action={deletePost.bind(null, post.id)}>
                                                <Button variant="ghost" size="icon" className="hover:bg-red-500/10 hover:text-red-400">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
