import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createDoc } from "@/app/actions/docs";

export default function NewDocPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/our-story">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4 text-white" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Create Article</h2>
                    <p className="text-muted-foreground">Add a new documentation page.</p>
                </div>
            </div>

            <Card className="bg-white/5 border-white/10 max-w-4xl">
                <form action={createDoc}>
                    <CardHeader>
                        <CardTitle className="text-white">Article Details</CardTitle>
                        <CardDescription>Fill in the content for the new doc.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-slate-200">Title</Label>
                                <Input id="title" name="title" required placeholder="e.g. Getting Started" className="bg-white/5 border-white/10 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug" className="text-slate-200">Slug</Label>
                                <Input id="slug" name="slug" required placeholder="getting-started" className="bg-white/5 border-white/10 text-white" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-slate-200">Category</Label>
                            <Input id="category" name="category" required placeholder="e.g. Introduction" className="bg-white/5 border-white/10 text-white" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content" className="text-slate-200">Content (HTML or Markdown)</Label>
                            <Textarea
                                id="content"
                                name="content"
                                required
                                className="min-h-[400px] font-mono text-sm bg-white/5 border-white/10 text-white"
                                placeholder="<h1>Hello World</h1><p>Start writing...</p>"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t border-white/5 pt-4 flex justify-end">
                        <Button type="submit" variant="premium" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            Publish Article
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
