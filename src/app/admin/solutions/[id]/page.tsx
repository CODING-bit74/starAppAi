import { createSolution, getSolution, updateSolution } from "@/app/actions/solutions";
import { SolutionEditorForm } from "@/components/admin/SolutionEditorForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminSolutionEditor({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const isNew = id === "new";
    let solution = null;

    if (!isNew) {
        solution = await getSolution(id);
        if (!solution) {
            redirect("/admin/solutions");
        }
    }

    const action = isNew ? createSolution : updateSolution.bind(null, id);

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/admin/solutions">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold text-white">
                    {isNew ? "Add New Solution" : "Edit Solution"}
                </h1>
            </div>

            <SolutionEditorForm solution={solution} action={action} isNew={isNew} />
        </div>
    );
}
