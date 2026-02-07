import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import DemoClient from "./DemoClient";

// 2. Server Component Entry Point
export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // @ts-ignore
    const project = await prisma.project.findFirst({
        where: { slug }
    });

    if (!project) {
        notFound();
    }

    // Parse JSON fields safely
    const ProjectAny = project as any;
    const parsedProject = {
        ...project,
        demoConfig: ProjectAny.demoConfig ? JSON.parse(ProjectAny.demoConfig) : null,
        repoData: ProjectAny.repoData ? JSON.parse(ProjectAny.repoData) : null,
        tags: ProjectAny.tags ? JSON.parse(ProjectAny.tags) : [] // Parse tags as we stored them as JSON string
    };

    // 3. Render Client Component
    return <DemoClient project={parsedProject} />;
}
