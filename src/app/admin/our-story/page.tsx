import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, FileText } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteDoc } from "@/app/actions/docs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminDocsPage() {
    // @ts-ignore
    const docs = await prisma.doc.findMany({
        orderBy: [
            { category: 'asc' },
            { order: 'asc' }
        ]
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Our Story</h2>
                    <p className="text-muted-foreground">Manage your help articles and guides.</p>
                </div>
                <Link href="/admin/our-story/new">
                    <Button variant="premium" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Plus className="mr-2 h-4 w-4" /> New Article
                    </Button>
                </Link>
            </div>

            <div className="border border-white/10 rounded-lg bg-white/5 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/10 hover:bg-white/5">
                            <TableHead className="text-slate-400">Title</TableHead>
                            <TableHead className="text-slate-400">Slug</TableHead>
                            <TableHead className="text-slate-400">Category</TableHead>
                            <TableHead className="text-right text-slate-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {docs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                                    No articles found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            // @ts-ignore
                            docs.map((doc) => (
                                <TableRow key={doc.id} className="border-white/10 hover:bg-white/5">
                                    <TableCell className="font-medium text-white flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-slate-500" />
                                        {doc.title}
                                    </TableCell>
                                    <TableCell className="text-slate-400 font-mono text-xs">{doc.slug}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="border-white/10 text-slate-300">
                                            {doc.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right flex justify-end gap-2">
                                        <Link href={`/admin/our-story/${doc.id}`}>
                                            <Button variant="ghost" size="icon" className="hover:bg-indigo-500/10 hover:text-indigo-400">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <form action={deleteDoc.bind(null, doc.id)}>
                                            <Button variant="ghost" size="icon" className="hover:bg-red-500/10 hover:text-red-400">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
