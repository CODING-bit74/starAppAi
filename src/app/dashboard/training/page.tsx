"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, Link as LinkIcon, FileText, Trash2, CheckCircle2, RotateCw } from "lucide-react";
import { useState } from "react";

export default function TrainingPage() {
    const [urls, setUrls] = useState<string[]>(["https://example.com/pricing", "https://example.com/about"]);
    const [files, setFiles] = useState<string[]>(["product_manual_v2.pdf", "faq_list.docx"]);
    const [newUrl, setNewUrl] = useState("");
    const [isTraining, setIsTraining] = useState(false);

    const handleAddUrl = () => {
        if (newUrl) {
            setUrls([...urls, newUrl]);
            setNewUrl("");
        }
    };

    const handleTrainAgent = () => {
        setIsTraining(true);
        setTimeout(() => setIsTraining(false), 3000);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">AI Training</h2>
                    <p className="text-muted-foreground">Manage the knowledge base for your AI agents.</p>
                </div>
                <Button
                    variant="premium"
                    className="min-w-[140px]"
                    onClick={handleTrainAgent}
                    disabled={isTraining}
                >
                    {isTraining ? (
                        <>
                            <RotateCw className="mr-2 h-4 w-4 animate-spin" /> Training...
                        </>
                    ) : (
                        <>
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Retrain Agent
                        </>
                    )}
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* File Upload Section */}
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Documents</CardTitle>
                        <CardDescription>Upload PDFs, DOCX, or TXT files for the agent to learn from.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="border-2 border-dashed border-white/10 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className="p-3 bg-indigo-500/10 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                <Upload className="h-6 w-6 text-indigo-400" />
                            </div>
                            <h3 className="text-sm font-medium text-white">Click to upload or drag and drop</h3>
                            <p className="text-xs text-slate-500 mt-1">PDF, DOCX, TXT up to 10MB</p>
                        </div>

                        <div className="space-y-2">
                            {files.map((file, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-md border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-4 w-4 text-slate-400" />
                                        <span className="text-sm text-slate-200">{file}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-500/10">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* URL Management Section */}
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Website Links</CardTitle>
                        <CardDescription>Add URLs for the agent to crawl and index.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                placeholder="https://example.com"
                                className="bg-white/5 border-white/10 text-white"
                                value={newUrl}
                                onChange={(e) => setNewUrl(e.target.value)}
                            />
                            <Button variant="secondary" onClick={handleAddUrl}>Add</Button>
                        </div>

                        <div className="space-y-2">
                            {urls.map((url, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-md border border-white/5">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <LinkIcon className="h-4 w-4 text-slate-400 shrink-0" />
                                        <span className="text-sm text-slate-200 truncate">{url}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-[10px] text-green-400 border-green-500/20 bg-green-500/10">Parsed</Badge>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-500/10">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
