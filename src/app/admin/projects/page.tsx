import { Button } from "@/components/ui/button";
import { Plus, ExternalLink, Github, Trash2 } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProject } from "@/app/actions/admin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function AdminProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Manage Projects</h2>
                    <p className="text-muted-foreground">Update your portfolio projects.</p>
                </div>
                <Link href="/admin/projects/new">
                    <Button variant="premium" className="bg-red-600 hover:bg-red-700 text-white">
                        <Plus className="mr-2 h-4 w-4" /> New Project
                    </Button>
                </Link>
            </div>

            <div className="border border-white/10 rounded-lg bg-white/5 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/10 hover:bg-white/5">
                            <TableHead className="text-slate-400">Title</TableHead>
                            <TableHead className="text-slate-400">Category</TableHead>
                            <TableHead className="text-slate-400">Links</TableHead>
                            <TableHead className="text-right text-slate-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                                    No projects found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            projects.map((project) => (
                                <TableRow key={project.id} className="border-white/10 hover:bg-white/5">
                                    <TableCell className="font-medium text-white">{project.title}</TableCell>
                                    <TableCell className="text-slate-400">{project.category}</TableCell>
                                    <TableCell className="text-slate-400">
                                        <div className="flex gap-2">
                                            {project.demoUrl && (
                                                <a href={project.demoUrl} target="_blank" className="text-indigo-400 hover:text-indigo-300">
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            )}
                                            {project.repoUrl && (
                                                <a href={project.repoUrl} target="_blank" className="text-slate-400 hover:text-white">
                                                    <Github className="h-4 w-4" />
                                                </a>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <form action={deleteProject.bind(null, project.id)}>
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
