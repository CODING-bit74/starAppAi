"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash, Save, Search, Bot } from "lucide-react";
import { getKnowledgeBase, createKnowledge, updateKnowledge, deleteKnowledge, getSuggestions, createSuggestion, deleteSuggestion } from "@/app/actions/chat-settings";
import { useToast } from "@/hooks/use-toast";

export default function ChatAdminPage() {
    const [knowledge, setKnowledge] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { toast } = useToast();

    // Form state for new entry
    const [newTopic, setNewTopic] = useState("");
    const [newContent, setNewContent] = useState("");
    const [newKeywords, setNewKeywords] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        loadKnowledge();
    }, []);

    async function loadKnowledge() {
        setLoading(true);
        const data = await getKnowledgeBase();
        setKnowledge(data);
        setLoading(false);
    }

    async function handleCreate() {
        if (!newTopic || !newContent) return;

        const res = await createKnowledge({
            topic: newTopic,
            content: newContent,
            keywords: newKeywords
        });

        if (res.success) {
            toast({ title: "Success", description: "Knowledge entry created" });
            setNewTopic("");
            setNewContent("");
            setNewKeywords("");
            setIsCreating(false);
            loadKnowledge();
        } else {
            toast({ title: "Error", description: res.error, variant: "destructive" });
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this entry?")) return;

        const res = await deleteKnowledge(id);
        if (res.success) {
            toast({ title: "Success", description: "Entry deleted" });
            loadKnowledge();
        } else {
            toast({ title: "Error", description: res.error, variant: "destructive" });
        }
    }

    async function handleToggleActive(id: string, currentActive: boolean) {
        const item = knowledge.find(k => k.id === id);
        if (!item) return;

        const res = await updateKnowledge(id, {
            topic: item.topic,
            content: item.content,
            keywords: item.keywords || "",
            active: !currentActive
        });

        if (res.success) {
            loadKnowledge();
        }
    }

    // Suggestions Logic
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [newSuggestion, setNewSuggestion] = useState("");

    async function loadSuggestions() {
        const data = await getSuggestions();
        setSuggestions(data);
    }

    async function handleCreateSuggestion(e: React.FormEvent) {
        e.preventDefault();
        if (!newSuggestion.trim()) return;
        const res = await createSuggestion(newSuggestion);
        if (res.success) {
            toast({ title: "Success", description: "Suggestion added" });
            setNewSuggestion("");
            loadSuggestions();
        }
    }

    async function handleDeleteSuggestion(id: string) {
        if (!confirm("Delete this suggestion?")) return;
        const res = await deleteSuggestion(id);
        if (res.success) {
            loadSuggestions();
        }
    }

    useEffect(() => {
        loadSuggestions();
    }, []);

    const filteredKnowledge = knowledge.filter(k =>
        k.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        k.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Chatbot Knowledge Base</h1>
                    <p className="text-slate-400 mt-2">Teach your AI assistant about your business, pricing, and services.</p>
                </div>
                <Button onClick={() => setIsCreating(!isCreating)} className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="h-4 w-4 mr-2" /> Add New Knowledge
                </Button>
            </div>

            {isCreating && (
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">New Knowledge Entry</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-white">Topic / Question</Label>
                                <Input
                                    className="bg-black/20 border-white/10 text-white"
                                    placeholder="e.g. Pricing Plans"
                                    value={newTopic}
                                    onChange={e => setNewTopic(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-white">Keywords (Optional)</Label>
                                <Input
                                    className="bg-black/20 border-white/10 text-white"
                                    placeholder="pricing, cost, subscription"
                                    value={newKeywords}
                                    onChange={e => setNewKeywords(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-white">Content / Answer <span className="text-xs text-slate-400">(This is what the AI will use to answer)</span></Label>
                            <Textarea
                                className="bg-black/20 border-white/10 text-white min-h-[100px]"
                                placeholder="Basic Plan starts at $29/mo..."
                                value={newContent}
                                onChange={e => setNewContent(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={() => setIsCreating(false)} className="text-slate-400">Cancel</Button>
                            <Button onClick={handleCreate} className="bg-indigo-600 hover:bg-indigo-700">
                                <Save className="h-4 w-4 mr-2" /> Save Entry
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Suggestions Management */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Starter Questions</h2>
                        <p className="text-sm text-slate-400">Questions that appear when a user opens the chat.</p>
                    </div>
                    <form onSubmit={handleCreateSuggestion} className="flex gap-2">
                        <Input
                            placeholder="New suggestion..."
                            className="bg-black/20 border-white/10 text-white w-64"
                            value={newSuggestion}
                            onChange={(e) => setNewSuggestion(e.target.value)}
                        />
                        <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                            <Plus className="h-4 w-4" /> Add
                        </Button>
                    </form>
                </div>

                <div className="space-y-2">
                    {suggestions.map((s) => (
                        <div key={s.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 group">
                            <span className="text-slate-200 text-sm">{s.text}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-slate-500 hover:text-red-400"
                                onClick={() => handleDeleteSuggestion(s.id)}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    {suggestions.length === 0 && <p className="text-sm text-slate-500 italic">No suggestions added yet.</p>}
                </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/10">
                <Search className="h-5 w-5 text-slate-400" />
                <Input
                    className="bg-transparent border-none text-white focus-visible:ring-0 placeholder:text-slate-500"
                    placeholder="Search knowledge base..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <p className="text-slate-400">Loading knowledge base...</p>
                ) : filteredKnowledge.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                        <Bot className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400">No knowledge entries found.</p>
                        <p className="text-slate-500 text-sm">Create one to get started.</p>
                    </div>
                ) : (
                    filteredKnowledge.map((item) => (
                        <Card key={item.id} className={`bg-white/5 border-white/10 transition-colors ${!item.active ? 'opacity-50' : ''}`}>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-semibold text-white text-lg">{item.topic}</h3>
                                            {item.keywords && (
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                                    {item.keywords}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-slate-400 text-sm whitespace-pre-wrap">{item.content}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-2 mr-4">
                                            <Label htmlFor={`active-${item.id}`} className="text-xs text-slate-400">Active</Label>
                                            <Switch
                                                id={`active-${item.id}`}
                                                checked={item.active}
                                                onCheckedChange={() => handleToggleActive(item.id, item.active)}
                                            />
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
