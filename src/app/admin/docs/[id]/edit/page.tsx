import { DocForm } from "@/components/admin/DocForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditDocPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const doc = await prisma.doc.findUnique({
        where: { id }
    });

    if (!doc) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Edit Chapter</h2>
                <p className="text-slate-400">Update content for "{doc.title}"</p>
            </div>
            <DocForm mode="edit" doc={doc} />
        </div>
    );
}
