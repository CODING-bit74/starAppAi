import { FaqForm } from "@/components/admin/FaqForm";

export default function NewFaqPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Create New FAQ</h2>
                <p className="text-slate-400">Add a new question and answer pair.</p>
            </div>
            <FaqForm mode="create" />
        </div>
    );
}
