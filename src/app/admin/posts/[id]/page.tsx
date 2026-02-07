import { createPost, getPost, updatePost } from "@/app/actions/posts";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PostEditorForm } from "@/components/admin/PostEditorForm";

export default async function AdminPostEditor({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const isNew = id === "new";
    let post = null;

    if (!isNew) {
        post = await getPost(id);
        if (!post) {
            redirect("/admin/posts");
        }
    }

    const action = isNew ? createPost : updatePost.bind(null, id);

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/admin/posts">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold text-white">
                    {isNew ? "Write New Post" : "Edit Post"}
                </h1>
            </div>

            <PostEditorForm post={post} action={action} isNew={isNew} />
        </div>
    );
}
