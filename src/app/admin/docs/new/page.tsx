import { DocForm } from "@/components/admin/DocForm";

export default function NewDocPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Create New Chapter</h2>
                <p className="text-slate-400">Add a new section to the "Our Story" page.</p>
            </div>
            <DocForm mode="create" />
        </div>
    );
}
