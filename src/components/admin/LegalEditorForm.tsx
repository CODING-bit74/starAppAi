"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useState } from "react";

export function LegalEditorForm({ initialContent, slug, action }: { initialContent: string, slug: string, action: Function }) {
    const [content, setContent] = useState(initialContent);
    const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    async function handleSubmit(formData: FormData) {
        setStatus('saving');
        await action(slug, formData.get('content'));
        setStatus('saved');
        setTimeout(() => setStatus('idle'), 2000);
    }

    return (
        <form action={handleSubmit}>
            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Content (HTML)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[500px] font-mono bg-[#0B0F19] border-white/10 text-white"
                        placeholder="<h1>Privacy Policy</h1><p>...</p>"
                    />
                    <div className="flex justify-end">
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={status === 'saving'}>
                            <Save className="mr-2 h-4 w-4" />
                            {status === 'saving' ? 'Saving...' : status === 'saved' ? 'Saved!' : 'Save Changes'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
