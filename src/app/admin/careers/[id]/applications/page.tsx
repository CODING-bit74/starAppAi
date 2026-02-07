import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { notFound } from "next/navigation";

export default async function AdminJobApplicationsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // @ts-ignore
    const job = await prisma.job.findUnique({
        where: { id },
        include: {
            applications: {
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!job) return notFound();

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/careers">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4 text-white" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Applications for {job.title}</h2>
                    <p className="text-muted-foreground">{job.applications.length} candidates applied.</p>
                </div>
            </div>

            <div className="border border-white/10 rounded-lg bg-white/5 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/10 hover:bg-white/5">
                            <TableHead className="text-slate-400">Name</TableHead>
                            <TableHead className="text-slate-400">Email</TableHead>
                            <TableHead className="text-slate-400">Resume</TableHead>
                            <TableHead className="text-slate-400">Applied</TableHead>
                            <TableHead className="text-right text-slate-400">Cover Letter</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {job.applications.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                                    No applications yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            job.applications.map((app: any) => (
                                <TableRow key={app.id} className="border-white/10 hover:bg-white/5">
                                    <TableCell className="font-medium text-white">{app.name}</TableCell>
                                    <TableCell className="text-slate-400">{app.email}</TableCell>
                                    <TableCell>
                                        <a href={app.resumeUrl} target="_blank" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300">
                                            <ExternalLink className="h-4 w-4" /> View Resume
                                        </a>
                                    </TableCell>
                                    <TableCell className="text-slate-400">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {/* Simple view for now, maybe a modal later */}
                                        <div className="max-w-[300px] truncate ml-auto text-slate-500" title={app.coverLetter || ""}>
                                            {app.coverLetter || "N/A"}
                                        </div>
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
