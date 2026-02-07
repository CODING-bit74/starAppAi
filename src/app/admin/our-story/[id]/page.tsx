
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { updateDoc } from "@/app/actions/docs";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditDocPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // @ts-ignore
    const doc = await prisma.doc.findUnique({
        where: { id }
    });

    if (!doc) {
        notFound();
    }

    const updateDocWithId = updateDoc.bind(null, id);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/our-story">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4 text-white" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Edit Article</h2>
                    <p className="text-muted-foreground">Update content for {doc.title}</p>
                </div>
            </div>

            <Card className="bg-white/5 border-white/10 max-w-4xl">
                <form action={updateDocWithId}>
                    <CardHeader>
                        <CardTitle className="text-white">Article Details</CardTitle>
                        <CardDescription>Edit the content below.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-slate-200">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    required
                                    defaultValue={doc.title}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug" className="text-slate-200">Slug</Label>
                                <Input
                                    id="slug"
                                    name="slug"
                                    required
                                    defaultValue={doc.slug}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-slate-200">Category</Label>
                            <Input
                                id="category"
                                name="category"
                                required
                                defaultValue={doc.category}
                                className="bg-white/5 border-white/10 text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content" className="text-slate-200">Content (HTML or Markdown)</Label>
                            <Textarea
                                id="content"
                                name="content"
                                required
                                defaultValue={doc.content}
                                className="min-h-[400px] font-mono text-sm bg-white/5 border-white/10 text-white"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t border-white/5 pt-4 flex justify-end">
                        <Button type="submit" variant="premium" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            Update Article
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
