import { createCaseStudy, getCaseStudy, updateCaseStudy } from "@/app/actions/case-studies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminCaseStudyEditor({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const isNew = id === "new";
    let study = null;

    if (!isNew) {
        study = await getCaseStudy(id);
        if (!study) {
            redirect("/admin/case-studies");
        }
    }

    const action = isNew ? createCaseStudy : updateCaseStudy.bind(null, id);

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/admin/case-studies">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold text-white">
                    {isNew ? "Create Case Study" : "Edit Case Study"}
                </h1>
            </div>

            <form action={action}>
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Case Study Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-slate-200">Title</Label>
                                <Input
                                    id="title" name="title" required
                                    defaultValue={study?.title}
                                    className="bg-[#0B0F19] border-white/10 text-white"
                                    placeholder="e.g. Automating DeFi Compliance"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-slate-200">Company Name</Label>
                                <Input
                                    id="company" name="company" required
                                    defaultValue={study?.company}
                                    className="bg-[#0B0F19] border-white/10 text-white"
                                    placeholder="e.g. FinTech Global"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug" className="text-slate-200">Slug (URL)</Label>
                            <Input
                                id="slug" name="slug" required
                                defaultValue={study?.slug}
                                className="bg-[#0B0F19] border-white/10 text-white"
                                placeholder="automating-defi-compliance"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-slate-200">Short Description</Label>
                            <Textarea
                                id="description" name="description" required
                                defaultValue={study?.description}
                                className="bg-[#0B0F19] border-white/10 text-white min-h-[100px]"
                                placeholder="Brief summary for the card view..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="metric" className="text-slate-200">Key Metric Value</Label>
                                <Input
                                    id="metric" name="metric" required
                                    defaultValue={study?.metric}
                                    className="bg-[#0B0F19] border-white/10 text-white"
                                    placeholder="e.g. 75%"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="result" className="text-slate-200">Metric Result/Label</Label>
                                <Input
                                    id="result" name="result" required
                                    defaultValue={study?.result}
                                    className="bg-[#0B0F19] border-white/10 text-white"
                                    placeholder="e.g. Reduced audit time by 75%"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content" className="text-slate-200">Full Content (HTML Supported)</Label>
                            <Textarea
                                id="content" name="content" required
                                defaultValue={study?.content}
                                className="bg-[#0B0F19] border-white/10 text-white min-h-[300px] font-mono text-sm"
                                placeholder="<p>Detailed explanation of the problem, solution, and implementation...</p>"
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 min-w-[150px]">
                                <Save className="mr-2 h-4 w-4" />
                                {isNew ? "Create" : "Update"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
