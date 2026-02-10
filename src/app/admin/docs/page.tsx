import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteDoc } from "@/app/actions/docs";

export default async function AdminDocsPage() {
    const docs = await prisma.doc.findMany({
        orderBy: [
            { category: 'asc' },
            { order: 'asc' }
        ]
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Our Story Chapters</h2>
                    <p className="text-slate-400">Manage the content for the "Our Story" page.</p>
                </div>
                <Link href="/admin/docs/new">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                        <Plus className="mr-2 h-4 w-4" />
                        New Chapter
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border border-white/10 bg-white/5">
                <div className="p-4">
                    {docs.length === 0 ? (
                        <div className="text-center py-10 text-slate-500">
                            <FileText className="h-10 w-10 mx-auto mb-3 opacity-50" />
                            <p>No chapters found. Create one to get started.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {docs.map((doc) => (
                                <div
                                    key={doc.id}
                                    className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-white">{doc.title}</span>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                {doc.category}
                                            </span>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20">
                                                Order: {doc.order}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 font-mono">/{doc.slug}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/docs/${doc.id}/edit`}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <form action={deleteDoc.bind(null, doc.id)}>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
