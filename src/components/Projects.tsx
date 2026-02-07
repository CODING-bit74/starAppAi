import { ProjectsList } from "./ProjectsList";
import { prisma } from "@/lib/prisma";

export async function Projects() {
    // Fetch projects from DB
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
        take: 4 // Limit to featured projects
    });

    return (
        <section id="projects" className="py-24 bg-[#020617] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-3">Our Work</span>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-6">
                        Featured Projects
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Explore our latest innovations in mobile apps, artificial intelligence, and decentralized technologies.
                    </p>
                </div>

                <ProjectsList projects={projects} />
            </div>
        </section>
    );
}
