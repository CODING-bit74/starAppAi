"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Brain, Link as LinkIcon, Shield, Zap, BarChart, Globe, Briefcase, Users, Layout, Database } from "lucide-react";
import { useState } from "react";

interface SolutionEditorFormProps {
    solution?: any;
    action: (formData: FormData) => void;
    isNew: boolean;
}

const icons = [
    { value: "Brain", label: "Brain (AI)", icon: Brain },
    { value: "Link", label: "Link (Blockchain)", icon: LinkIcon },
    { value: "Shield", label: "Shield (Security)", icon: Shield },
    { value: "Zap", label: "Zap (Automation)", icon: Zap },
    { value: "BarChart", label: "BarChart (Analytics)", icon: BarChart },
    { value: "Globe", label: "Globe (Web3)", icon: Globe },
    { value: "Briefcase", label: "Briefcase (Business)", icon: Briefcase },
    { value: "Users", label: "Users (HR/Team)", icon: Users },
    { value: "Layout", label: "Layout (Design)", icon: Layout },
    { value: "Database", label: "Database (Data)", icon: Database },
];

export function SolutionEditorForm({ solution, action, isNew }: SolutionEditorFormProps) {
    return (
        <form action={action}>
            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Solution Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-slate-200">Title</Label>
                            <Input
                                id="title" name="title" required
                                defaultValue={solution?.title}
                                className="bg-[#0B0F19] border-white/10 text-white"
                                placeholder="e.g. Enterprise DeFi"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug" className="text-slate-200">Slug (URL)</Label>
                            <Input
                                id="slug" name="slug" required
                                defaultValue={solution?.slug}
                                className="bg-[#0B0F19] border-white/10 text-white"
                                placeholder="enterprise-defi"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-slate-200">Short Description</Label>
                        <Textarea
                            id="description" name="description" required
                            defaultValue={solution?.description}
                            className="bg-[#0B0F19] border-white/10 text-white min-h-[80px]"
                            placeholder="Brief summary for card previews..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="icon" className="text-slate-200">Icon</Label>
                            <div className="relative">
                                <select
                                    name="icon"
                                    defaultValue={solution?.icon || "Zap"}
                                    className="w-full bg-[#0B0F19] border border-white/10 text-white rounded-md h-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                                >
                                    {icons.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order" className="text-slate-200">Order Priority</Label>
                            <Input
                                id="order" name="order" type="number"
                                defaultValue={solution?.order || 0}
                                className="bg-[#0B0F19] border-white/10 text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="features" className="text-slate-200">Key Features (JSON List or Comma Separated)</Label>
                        <Input
                            id="features" name="features"
                            defaultValue={solution?.features || "[]"}
                            className="bg-[#0B0F19] border-white/10 text-white font-mono text-xs"
                            placeholder='["Feature 1", "Feature 2"]'
                        />
                        <p className="text-xs text-slate-500">Enter features as a JSON array or comma-separated list.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content" className="text-slate-200">Content (HTML Supported)</Label>
                        <Textarea
                            id="content"
                            name="content"
                            required
                            defaultValue={solution?.content}
                            className="bg-[#0B0F19] border-white/10 text-white min-h-[300px] font-mono text-sm"
                            placeholder="<p>Detailed explanation of the solution...</p>"
                        />
                    </div>

                    <div className="pt-4 border-t border-white/10 flex justify-end">
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 min-w-[150px]">
                            <Save className="mr-2 h-4 w-4" />
                            {isNew ? "Create Solution" : "Update Solution"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
