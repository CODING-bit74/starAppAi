import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitApplication } from "@/app/actions/application";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default async function ApplicationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // @ts-ignore
    const job = await prisma.job.findUnique({
        where: { id }
    });

    if (!job) {
        return notFound();
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#0B0F19]">
            <Navbar />
            <main className="flex-1 py-12 px-4">
                <div className="max-w-2xl mx-auto space-y-8">
                    <div className="flex items-center gap-4">
                        <Link href="/careers">
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/5">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-white">Apply for {job.title}</h2>
                            <p className="text-muted-foreground">{job.department} • {job.location}</p>
                        </div>
                    </div>

                    <Card className="bg-white/5 border-white/10">
                        <form action={submitApplication}>
                            <input type="hidden" name="jobId" value={job.id} />

                            <CardHeader>
                                <CardTitle className="text-white">Your Information</CardTitle>
                                <CardDescription>Tell us about yourself.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-slate-200">Full Name</Label>
                                    <Input id="name" name="name" required placeholder="John Doe" className="bg-white/5 border-white/10 text-white" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-slate-200">Email Address</Label>
                                    <Input id="email" name="email" type="email" required placeholder="john@example.com" className="bg-white/5 border-white/10 text-white" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="resume" className="text-slate-200">Resume / CV (PDF, DOCX)</Label>
                                    <Input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" required className="bg-white/5 border-white/10 text-white file:text-white file:bg-white/10 file:border-0 hover:file:bg-white/20" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="coverLetter" className="text-slate-200">Cover Letter</Label>
                                    <Textarea id="coverLetter" name="coverLetter" placeholder="Why are you a good fit for this role?" className="bg-white/5 border-white/10 text-white min-h-[200px]" />
                                </div>
                            </CardContent>
                            <CardFooter className="border-t border-white/5 px-6 py-4 flex justify-end">
                                <Button type="submit" variant="premium" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                    Submit Application
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}
