"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Brain, Link as LinkIcon, Shield, Zap, BarChart, Globe } from "lucide-react";
import { useState } from "react";

interface ServiceEditorFormProps {
    service?: any;
    action: (formData: FormData) => void;
    isNew: boolean;
}

const icons = [
    { value: "Brain", label: "Brain (AI)", icon: Brain },
    { value: "Link", label: "Link (Blockchain)", icon: LinkIcon },
    { value: "Globe", label: "Globe (Web3)", icon: Globe },
    { value: "Shield", label: "Shield (Security)", icon: Shield },
    { value: "Zap", label: "Zap (Automation)", icon: Zap },
    { value: "BarChart", label: "BarChart (Analytics)", icon: BarChart },
];

const colors = [
    { value: "text-indigo-400", label: "Indigo" },
    { value: "text-cyan-400", label: "Cyan" },
    { value: "text-purple-400", label: "Purple" },
    { value: "text-emerald-400", label: "Emerald" },
    { value: "text-yellow-400", label: "Yellow" },
    { value: "text-pink-400", label: "Pink" },
];

export function ServiceEditorForm({ service, action, isNew }: ServiceEditorFormProps) {
    // We don't need complex state here if we rely on native selects and form submission

    return (
        <form action={action}>
            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Service Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-slate-200">Title</Label>
                        <Input
                            id="title" name="title" required
                            defaultValue={service?.title}
                            className="bg-[#0B0F19] border-white/10 text-white"
                            placeholder="e.g. AI & Machine Learning"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-slate-200">Description</Label>
                        <Textarea
                            id="description" name="description" required
                            defaultValue={service?.description}
                            className="bg-[#0B0F19] border-white/10 text-white min-h-[100px]"
                            placeholder="Brief description of the capability..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="icon" className="text-slate-200">Icon</Label>
                            <div className="relative">
                                <select
                                    name="icon"
                                    defaultValue={service?.icon || "Zap"}
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
                            <Label htmlFor="color" className="text-slate-200">Accent Color</Label>
                            <div className="relative">
                                <select
                                    name="color"
                                    defaultValue={service?.color || "text-indigo-400"}
                                    className="w-full bg-[#0B0F19] border border-white/10 text-white rounded-md h-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                                >
                                    {colors.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="order" className="text-slate-200">Order Priority (Optional)</Label>
                        <Input
                            id="order" name="order" type="number"
                            defaultValue={service?.order || 0}
                            className="bg-[#0B0F19] border-white/10 text-white"
                        />
                    </div>

                    <div className="pt-4 border-t border-white/10 flex justify-end">
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 min-w-[150px]">
                            <Save className="mr-2 h-4 w-4" />
                            {isNew ? "Create Service" : "Update Service"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
