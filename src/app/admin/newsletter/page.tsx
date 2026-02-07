"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getSubscribers, sendNewsletter, generateAiNewsletter } from "@/app/actions/newsletter";
import { useState, useEffect, useTransition } from "react";
import { Mail, Sparkles, Send, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AdminNewsletterPage() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [stats, setStats] = useState({ total: 0 });
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [isGenerating, startGeneration] = useTransition();
    const [isSending, startSending] = useTransition();
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        loadSubscribers();
    }, []);

    async function loadSubscribers() {
        const subs = await getSubscribers();
        setSubscribers(subs);
        setStats({ total: subs.length });
    }

    function handleGenerate() {
        startGeneration(async () => {
            const draft = await generateAiNewsletter();
            setSubject(draft.subject);
            setContent(draft.content);
        });
    }

    function handleSend(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("subject", subject);
        formData.append("content", content);

        startSending(async () => {
            await sendNewsletter(formData);
            setSuccessMessage(`Newsletter sent successfully to ${subscribers.length} subscribers!`);
            setSubject("");
            setContent("");
            setTimeout(() => setSuccessMessage(""), 5000);
        });
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Newsletter & Updates</h1>
                    <p className="text-slate-400">Manage subscribers and send AI-powered updates.</p>
                </div>
                <Badge variant="secondary" className="px-4 py-2 text-md">
                    <Users className="w-4 h-4 mr-2" />
                    {stats.total} Subscribers
                </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Composer Section */}
                <div className="lg:col-span-2 space-y-6">

                    {/* AI Assistant Card */}
                    <Card className="bg-indigo-900/40 border-indigo-500/50">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-indigo-400" />
                                AI Content Assistant
                            </CardTitle>
                            <CardDescription className="text-indigo-200">
                                Let our AI agents research the latest tech trends and draft a professional newsletter for you.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                type="button"
                                variant="default"
                                className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-semibold shadow-lg shadow-indigo-500/20"
                                onClick={handleGenerate}
                                disabled={isGenerating}
                            >
                                <Sparkles className={`w-5 h-5 mr-3 ${isGenerating ? 'animate-spin' : ''}`} />
                                {isGenerating ? 'Researching & Drafting Content...' : 'Generate "Tech Trends" Newsletter'}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Manual Editor Card */}
                    <Card className="bg-white/5 border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Mail className="w-5 h-5 text-indigo-400" />
                                Review & Send
                            </CardTitle>
                            <CardDescription>Review the generated content or write your own update below.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSend} className="space-y-4">
                                {successMessage && (
                                    <Alert className="bg-green-500/10 border-green-500/20 text-green-400">
                                        <AlertTitle>Success</AlertTitle>
                                        <AlertDescription>{successMessage}</AlertDescription>
                                    </Alert>
                                )}

                                <div>
                                    <Label className="text-slate-200">Subject</Label>
                                    <Input
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="Enter newsletter subject..."
                                        className="bg-white/5 border-white/10 text-white mt-1.5"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label className="text-slate-200">Content</Label>
                                    <Textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Content will appear here after AI generation..."
                                        className="bg-white/5 border-white/10 text-white min-h-[300px] mt-1.5 font-mono text-sm"
                                        required
                                    />
                                </div>

                                <div className="pt-2 flex justify-end">
                                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={isSending}>
                                        <Send className="w-4 h-4 mr-2" />
                                        {isSending ? 'Sending...' : 'Send to All Subscribers'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Subscribers List (Sidebar) */}
                <div>
                    <Card className="bg-white/5 border-white/10 h-full">
                        <CardHeader>
                            <CardTitle className="text-white text-lg">Recent Subscribers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {subscribers.length === 0 ? (
                                    <p className="text-slate-500 text-sm text-center py-8">No subscribers yet.</p>
                                ) : (
                                    subscribers.slice(0, 10).map((sub: any) => (
                                        <div key={sub.id} className="flex items-center gap-3 pb-3 border-b border-white/5 last:border-0">
                                            <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                                <Users className="h-4 w-4" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-white text-sm truncate">{sub.email}</p>
                                                <p className="text-slate-500 text-xs">
                                                    {new Date(sub.subscribedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {subscribers.length > 10 && (
                                    <p className="text-center text-xs text-slate-500 pt-2">
                                        + {subscribers.length - 10} more
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
