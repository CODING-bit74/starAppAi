"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Save, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";

interface PostEditorFormProps {
    post?: any;
    action: (formData: FormData) => void;
    isNew: boolean;
}

export function PostEditorForm({ post, action, isNew }: PostEditorFormProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [content, setContent] = useState<string>(post?.content || "");

    const insertImage = () => {
        const url = window.prompt("Enter Image URL:");
        if (url) {
            const imageHtml = `\n<img src="${url}" alt="Blog Image" class="w-full rounded-xl shadow-lg my-6" />\n`;

            // Insert at cursor position or append
            if (textareaRef.current) {
                const start = textareaRef.current.selectionStart;
                const end = textareaRef.current.selectionEnd;
                const newContent = content.substring(0, start) + imageHtml + content.substring(end);
                setContent(newContent);

                // Update textarea value directly to ensure sync (optional but good for safety)
                textareaRef.current.value = newContent;
            } else {
                setContent(prev => prev + imageHtml);
            }
        }
    };

    return (
        <form action={action}>
            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Post Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-slate-200">Title</Label>
                            <Input
                                id="title" name="title" required
                                defaultValue={post?.title}
                                className="bg-[#0B0F19] border-white/10 text-white"
                                placeholder="e.g. The Future of AI Agents"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug" className="text-slate-200">Slug (URL)</Label>
                            <Input
                                id="slug" name="slug" required
                                defaultValue={post?.slug}
                                className="bg-[#0B0F19] border-white/10 text-white"
                                placeholder="future-of-ai-agents"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="coverImage" className="text-slate-200">Cover Image URL</Label>
                        <Input
                            id="coverImage" name="coverImage"
                            defaultValue={post?.coverImage}
                            className="bg-[#0B0F19] border-white/10 text-white"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="excerpt" className="text-slate-200">Excerpt (Short Summary)</Label>
                        <Textarea
                            id="excerpt" name="excerpt" required
                            defaultValue={post?.excerpt}
                            className="bg-[#0B0F19] border-white/10 text-white min-h-[80px]"
                            placeholder="A brief summary for card previews..."
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="author" className="text-slate-200">Author</Label>
                            <Input
                                id="author" name="author" required
                                defaultValue={post?.author || "Admin"}
                                className="bg-[#0B0F19] border-white/10 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-slate-200">Category</Label>
                            <Input
                                id="category" name="category" required
                                defaultValue={post?.category || "Technology"}
                                className="bg-[#0B0F19] border-white/10 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="readTime" className="text-slate-200">Read Time</Label>
                            <Input
                                id="readTime" name="readTime" required
                                defaultValue={post?.readTime || "5 min read"}
                                className="bg-[#0B0F19] border-white/10 text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="content" className="text-slate-200">Content (HTML Supported)</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={insertImage}
                                className="text-xs h-7"
                            >
                                <ImageIcon className="mr-2 h-3 w-3" />
                                Insert Image
                            </Button>
                        </div>
                        <Textarea
                            id="content"
                            name="content"
                            required
                            ref={textareaRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="bg-[#0B0F19] border-white/10 text-white min-h-[400px] font-mono text-sm"
                            placeholder="<p>Write your article content here...</p>"
                        />
                        <p className="text-xs text-slate-500">
                            Tip: Use HTML tags for formatting. Click "Insert Image" to add photos.
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2">
                            <Switch id="published" name="published" defaultChecked={post?.published} />
                            <Label htmlFor="published" className="text-slate-200">Publish Immediately</Label>
                        </div>
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 min-w-[150px]">
                            <Save className="mr-2 h-4 w-4" />
                            {isNew ? "Publish" : "Update"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
