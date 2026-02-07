import { Button } from "@/components/ui/button";
import { Plus, Trash2, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteJob } from "@/app/actions/admin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminCareersPage() {
    // @ts-ignore
    const jobs = await prisma.job.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            _count: {
                select: { applications: true }
            }
        }
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Manage Careers</h2>
                    <p className="text-muted-foreground">Post and manage job openings.</p>
                </div>
                <Link href="/admin/careers/new">
                    <Button variant="premium" className="bg-red-600 hover:bg-red-700 text-white">
                        <Plus className="mr-2 h-4 w-4" /> Post Job
                    </Button>
                </Link>
            </div>

            <div className="border border-white/10 rounded-lg bg-white/5 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/10 hover:bg-white/5">
                            <TableHead className="text-slate-400">Position</TableHead>
                            <TableHead className="text-slate-400">Department</TableHead>
                            <TableHead className="text-slate-400">Location/Type</TableHead>
                            <TableHead className="text-slate-400">Applications</TableHead>
                            <TableHead className="text-right text-slate-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                                    No active job listings.
                                </TableCell>
                            </TableRow>
                        ) : (
                            jobs.map((job: any) => (
                                <TableRow key={job.id} className="border-white/10 hover:bg-white/5">
                                    <TableCell className="font-medium text-white">{job.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-300">
                                            {job.department}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-slate-400">
                                        <div className="flex flex-col gap-1 text-xs">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3" /> {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="h-3 w-3" /> {job.type}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/admin/careers/${job.id}/applications`}>
                                            <Badge variant="outline" className="text-blue-400 border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20 cursor-pointer">
                                                {job._count.applications} Applicants
                                            </Badge>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <form action={deleteJob.bind(null, job.id)}>
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
