import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/app/actions/admin";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/projects">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4 text-white" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">New Project</h2>
                    <p className="text-muted-foreground">Add a new item to your portfolio.</p>
                </div>
            </div>

            <Card className="bg-white/5 border-white/10">
                <form action={createProject}>
                    <CardHeader>
                        <CardTitle className="text-white">Project Details</CardTitle>
                        <CardDescription>Fill in the information about your project.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="text-slate-200">Project Title</Label>
                            <Input id="title" name="title" required placeholder="e.g. AI Content Generator" className="bg-white/5 border-white/10 text-white" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="category" className="text-slate-200">Category</Label>
                            <Input id="category" name="category" required placeholder="e.g. SaaS, eCommerce" className="bg-white/5 border-white/10 text-white" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description" className="text-slate-200">Short Description</Label>
                            <Textarea id="description" name="description" required placeholder="Brief summary for the card..." className="bg-white/5 border-white/10 text-white min-h-[100px]" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="demoUrl" className="text-slate-200 is-required">Live Demo URL</Label>
                                <Input id="demoUrl" name="demoUrl" placeholder="https://..." className="bg-white/5 border-white/10 text-white" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="repoUrl" className="text-slate-200">Source Code URL</Label>
                                <Input id="repoUrl" name="repoUrl" placeholder="https://github.com/..." className="bg-white/5 border-white/10 text-white" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="content" className="text-slate-200">Detailed Content (HTML/Markdown)</Label>
                            <Textarea id="content" name="content" required placeholder="Full project details..." className="bg-white/5 border-white/10 text-white min-h-[200px]" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="tags" className="text-slate-200">Tags (JSON)</Label>
                            <Input id="tags" name="tags" placeholder='["React", "Node.js"]' className="bg-white/5 border-white/10 text-white" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="demoConfig" className="text-slate-200">Demo Config (JSON)</Label>
                            <Textarea
                                id="demoConfig"
                                name="demoConfig"
                                className="font-mono text-xs bg-white/5 border-white/10 text-white h-24"
                                placeholder='{"type": "mobile", "features": ["Feature 1"]}'
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="repoData" className="text-slate-200">Repo Data (JSON)</Label>
                            <Textarea
                                id="repoData"
                                name="repoData"
                                className="font-mono text-xs bg-white/5 border-white/10 text-white h-32"
                                placeholder='{"stars": 100, "files": []}'
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t border-white/5 px-6 py-4 flex justify-end">
                        <Button type="submit" variant="premium" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            Create Project
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
