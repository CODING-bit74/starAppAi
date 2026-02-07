import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "@/app/actions/admin";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewJobPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/careers">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4 text-white" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Post New Job</h2>
                    <p className="text-muted-foreground">Open a new position.</p>
                </div>
            </div>

            <Card className="bg-white/5 border-white/10">
                <form action={createJob}>
                    <CardHeader>
                        <CardTitle className="text-white">Job Details</CardTitle>
                        <CardDescription>Role information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="text-slate-200">Job Title</Label>
                            <Input id="title" name="title" required placeholder="e.g. Senior Engineer" className="bg-white/5 border-white/10 text-white" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="department" className="text-slate-200">Department</Label>
                                <Input id="department" name="department" required placeholder="e.g. Engineering" className="bg-white/5 border-white/10 text-white" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location" className="text-slate-200">Location</Label>
                                <Input id="location" name="location" required placeholder="e.g. Remote / NYC" className="bg-white/5 border-white/10 text-white" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="type" className="text-slate-200">Employment Type</Label>
                            <select id="type" name="type" className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option value="Full-time">Full-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description" className="text-slate-200">Job Description</Label>
                            <Textarea id="description" name="description" required placeholder="Responsibilities and requirements..." className="bg-white/5 border-white/10 text-white min-h-[150px]" />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t border-white/5 px-6 py-4 flex justify-end">
                        <Button type="submit" variant="premium" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            Post Job
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
