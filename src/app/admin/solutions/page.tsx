import { getSolutions, deleteSolution } from "@/app/actions/solutions";
import { getPageContent, updatePageContent } from "@/app/actions/pages";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, GripVertical, Brain, Link as LinkIcon, Shield, Zap, BarChart, Globe, Briefcase, Users, Layout, Database, Save } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Icon map for display
const iconMap: any = {
    Brain, Link: LinkIcon, Shield, Zap, BarChart, Globe, Briefcase, Users, Layout, Database
};


export default async function AdminSolutionsPage() {
    const solutions = await getSolutions();
    const headerContent = await getPageContent("solutions_header");

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Solutions Page</h1>
                    <p className="text-slate-400">Manage the solutions listing page.</p>
                </div>
            </div>

            {/* Header Content Editor */}
            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Page Header</CardTitle>
                    <CardDescription>Customize the title and description at the top of the Solutions page.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={updatePageContent.bind(null, "solutions_header")} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="subtitle" className="text-slate-200">Badge / Subtitle</Label>
                                <Input
                                    id="subtitle" name="subtitle"
                                    defaultValue={headerContent.subtitle || ""}
                                    className="bg-[#0B0F19] border-white/10 text-white"
                                    placeholder="e.g. Enterprise Solutions"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-slate-200">Main Title</Label>
                                <Input
                                    id="title" name="title"
                                    defaultValue={headerContent.title}
                                    className="bg-[#0B0F19] border-white/10 text-white"
                                    placeholder="e.g. Tailored for your Industry"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-slate-200">Description</Label>
                            <Textarea
                                id="description" name="description"
                                defaultValue={headerContent.description || ""}
                                className="bg-[#0B0F19] border-white/10 text-white"
                                placeholder="Page description..."
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                                <Save className="mr-2 h-4 w-4" /> Save Header
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="flex items-center justify-between pt-8 border-t border-white/10">
                <h2 className="text-2xl font-bold text-white">Solution Cards</h2>
                <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                    <Link href="/admin/solutions/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Solution
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {solutions.map((solution: any) => {
                    const Icon = iconMap[solution.icon] || Zap;
                    return (
                        <Card key={solution.id} className="bg-white/5 border-white/10">
                            <CardContent className="flex items-center p-6 gap-6">
                                <div className="cursor-grab text-slate-500 hover:text-white">
                                    <GripVertical className="h-5 w-5" />
                                </div>

                                <div className="p-3 rounded-lg bg-indigo-500/20 text-indigo-400">
                                    <Icon className="h-6 w-6" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white">{solution.title}</h3>
                                    <p className="text-slate-400 line-clamp-1">{solution.description}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button asChild variant="ghost" size="icon" className="hover:bg-white/10">
                                        <Link href={`/admin/solutions/${solution.id}`}>
                                            <Pencil className="h-4 w-4 text-slate-400" />
                                        </Link>
                                    </Button>

                                    <form action={deleteSolution.bind(null, solution.id)}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-red-500/10 hover:text-red-500"
                                            type="submit"
                                        >
                                            <Trash2 className="h-4 w-4 text-slate-400" />
                                        </Button>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}

                {solutions.length === 0 && (
                    <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10 border-dashed">
                        <p className="text-slate-400">No solutions found. Create one to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
