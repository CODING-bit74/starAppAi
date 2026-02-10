"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createDoc, updateDoc } from "@/app/actions/docs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DocFormProps {
    doc?: {
        id: string;
        title: string;
        slug: string;
        category: string;
        content: string;
        order: number;
    };
    mode: "create" | "edit";
}

export function DocForm({ doc, mode }: DocFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);

        try {
            if (mode === "edit" && doc) {
                await updateDoc(doc.id, formData);
            } else {
                await createDoc(formData);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        name="title"
                        defaultValue={doc?.title}
                        placeholder="Chapter Title"
                        required
                        className="bg-white/5 border-white/10 text-white"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        name="slug"
                        defaultValue={doc?.slug}
                        placeholder="chapter-slug"
                        required
                        className="bg-white/5 border-white/10 text-white"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                        id="category"
                        name="category"
                        defaultValue={doc?.category}
                        placeholder="e.g. Getting Started"
                        required
                        className="bg-white/5 border-white/10 text-white"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="order">Order</Label>
                    <Input
                        id="order"
                        name="order"
                        type="number"
                        defaultValue={doc?.order ?? 0}
                        required
                        className="bg-white/5 border-white/10 text-white"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="content">Content (HTML supported)</Label>
                <Textarea
                    id="content"
                    name="content"
                    defaultValue={doc?.content}
                    placeholder="<p>Enter your content here...</p>"
                    required
                    className="min-h-[300px] font-mono text-sm bg-white/5 border-white/10 text-white"
                />
            </div>

            <div className="flex gap-4">
                <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={isLoading}
                >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {mode === "create" ? "Create Chapter" : "Update Chapter"}
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.back()}
                    className="text-slate-400 hover:text-white"
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
