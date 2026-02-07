import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Calendar, User, Github } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // @ts-ignore
    const project = await prisma.project.findFirst({
        where: { slug }
    });

    if (!project) {
        notFound();
    }

    // Parse parsing tags string to array
    const tags = typeof project.tags === 'string'
        ? project.tags.split(',').map((t: string) => t.trim())
        : [];

    return (
        <div className="min-h-screen flex flex-col bg-[#0B0F19]">
            <Navbar />

            <main className="flex-1">
                <div className="relative py-20 overflow-hidden border-b border-white/5">
                    <div className="absolute inset-0 bg-indigo-500/5 blur-[100px]" />
                    <div className="container mx-auto px-4 relative z-10">
                        <Link href="/#projects" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
                        </Link>

                        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                            <div className="max-w-3xl">
                                <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">{project.category}</Badge>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{project.title}</h1>
                                <p className="text-xl text-slate-400 mb-8">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag: string) => (
                                        <Badge key={tag} variant="outline" className="border-white/10 text-slate-300">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-row md:flex-col gap-4">
                                {project.demoUrl ? (
                                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                        <Button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700">
                                            Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button disabled className="w-full md:w-auto opacity-50 cursor-not-allowed">
                                        Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                                    </Button>
                                )}

                                {project.repoUrl ? (
                                    <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="w-full md:w-auto border-white/10 text-slate-300 hover:bg-white/5">
                                            View Code <Github className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button disabled variant="outline" className="w-full md:w-auto border-white/10 text-slate-300 opacity-50 cursor-not-allowed">
                                        View Code <Github className="ml-2 h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-2 prose prose-invert prose-lg max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: project.content || project.description }} />
                        </div>
                        <div className="md:col-span-1 space-y-8">
                            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                                <h3 className="text-lg font-semibold text-white mb-4">Project Details</h3>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-slate-500 flex items-center"><User className="h-4 w-4 mr-2" /> Client</span>
                                        <span className="text-slate-300">Confidential</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-slate-500 flex items-center"><Calendar className="h-4 w-4 mr-2" /> Year</span>
                                        <span className="text-slate-300">{new Date(project.createdAt).getFullYear()}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-slate-500">Duration</span>
                                        <span className="text-slate-300">Ongoing</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
