import { createService, getService, updateService } from "@/app/actions/services";
import { ServiceEditorForm } from "@/components/admin/ServiceEditorForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminServiceEditor({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const isNew = id === "new";
    let service = null;

    if (!isNew) {
        service = await getService(id);
        if (!service) {
            redirect("/admin/services");
        }
    }

    const action = isNew ? createService : updateService.bind(null, id);

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/admin/services">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold text-white">
                    {isNew ? "Add New Service" : "Edit Service"}
                </h1>
            </div>

            <ServiceEditorForm service={service} action={action} isNew={isNew} />
        </div>
    );
}
