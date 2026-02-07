import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CodeRepoClient from "./CodeRepoClient";

export default async function CodeRepoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // @ts-ignore
    const project = await prisma.project.findFirst({
        where: { slug }
    });

    if (!project) {
        notFound();
    }

    // Create a plain object for the client component
    const ProjectAny = project as any;
    const serializableProject = {
        ...project,
        tags: ProjectAny.tags ? JSON.parse(ProjectAny.tags) : [],
        repoData: ProjectAny.repoData ? JSON.parse(ProjectAny.repoData) : null,
        demoConfig: ProjectAny.demoConfig ? JSON.parse(ProjectAny.demoConfig) : null,
        icon: null, // React components cannot be passed to client components
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0d1117]">
            <Navbar />
            <CodeRepoClient project={serializableProject} />
            <Footer />
        </div>
    );
}
