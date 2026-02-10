import { FaqForm } from "@/components/admin/FaqForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const faq = await prisma.faq.findUnique({
        where: { id }
    });

    if (!faq) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Edit FAQ</h2>
                <p className="text-slate-400">Update the question or answer.</p>
            </div>
            <FaqForm mode="edit" faq={faq} />
        </div>
    );
}
