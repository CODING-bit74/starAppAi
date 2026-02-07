import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/app/actions/admin";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewBlogPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/blogs">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4 text-white" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">New Blog Post</h2>
                    <p className="text-muted-foreground">Publish a new article.</p>
                </div>
            </div>

            <Card className="bg-white/5 border-white/10">
                <form action={createPost}>
                    <CardHeader>
                        <CardTitle className="text-white">Post Details</CardTitle>
                        <CardDescription>Fill in the content of your blog post.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="text-slate-200">Title</Label>
                            <Input id="title" name="title" required placeholder="Article Title" className="bg-white/5 border-white/10 text-white" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="category" className="text-slate-200">Category</Label>
                                <Input id="category" name="category" required placeholder="e.g. Technology" className="bg-white/5 border-white/10 text-white" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="readTime" className="text-slate-200">Read Time</Label>
                                <Input id="readTime" name="readTime" required placeholder="e.g. 5 min read" className="bg-white/5 border-white/10 text-white" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="author" className="text-slate-200">Author</Label>
                                <Input id="author" name="author" required placeholder="Author Name" className="bg-white/5 border-white/10 text-white" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="coverImage" className="text-slate-200">Cover Image URL</Label>
                                <Input id="coverImage" name="coverImage" placeholder="https://..." className="bg-white/5 border-white/10 text-white" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="excerpt" className="text-slate-200">Excerpt (Summary)</Label>
                            <Textarea id="excerpt" name="excerpt" required placeholder="Short summary..." className="bg-white/5 border-white/10 text-white min-h-[80px]" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="content" className="text-slate-200">Full Content (HTML/Markdown)</Label>
                            <Textarea id="content" name="content" required placeholder="Write your post here..." className="bg-white/5 border-white/10 text-white min-h-[300px]" />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t border-white/5 px-6 py-4 flex justify-end">
                        <Button type="submit" variant="premium" className="bg-green-600 hover:bg-green-700 text-white">
                            Publish Post
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
