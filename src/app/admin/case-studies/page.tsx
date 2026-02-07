import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash, FileText } from "lucide-react";
import { getCaseStudies, deleteCaseStudy } from "@/app/actions/case-studies";

export default async function AdminCaseStudiesPage() {
    const studies = await getCaseStudies();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Case Studies</h1>
                <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                    <Link href="/admin/case-studies/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {studies.map((study: any) => (
                    <Card key={study.id} className="bg-white/5 border-white/10">
                        <CardHeader className="flex flex-row items-center justify-between p-6">
                            <div className="space-y-1">
                                <CardTitle className="text-xl text-white flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-indigo-400" />
                                    {study.title}
                                </CardTitle>
                                <p className="text-sm text-slate-400">
                                    {study.company} • {study.slug}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button asChild variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                                    <Link href={`/admin/case-studies/${study.id}`}>
                                        <Edit className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <form action={deleteCaseStudy.bind(null, study.id)}>
                                    <Button type="submit" variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </form>
                            </div>
                        </CardHeader>
                    </Card>
                ))}

                {studies.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        No case studies found. Create your first one!
                    </div>
                )}
            </div>
        </div>
    );
}
