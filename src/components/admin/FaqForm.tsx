"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createFaq, updateFaq } from "@/app/actions/faqs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface FaqFormProps {
    faq?: {
        id: string;
        question: string;
        answer: string;
        order: number;
    };
    mode: "create" | "edit";
}

export function FaqForm({ faq, mode }: FaqFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);

        try {
            if (mode === "edit" && faq) {
                await updateFaq(faq.id, formData);
            } else {
                await createFaq(formData);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Input
                    id="question"
                    name="question"
                    defaultValue={faq?.question}
                    placeholder="e.g. How do I reset my password?"
                    required
                    className="bg-white/5 border-white/10 text-white"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="answer">Answer</Label>
                <Textarea
                    id="answer"
                    name="answer"
                    defaultValue={faq?.answer}
                    placeholder="Provide a clear answer..."
                    required
                    className="min-h-[150px] bg-white/5 border-white/10 text-white"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                    id="order"
                    name="order"
                    type="number"
                    defaultValue={faq?.order ?? 0}
                    required
                    className="bg-white/5 border-white/10 text-white w-32"
                />
                <p className="text-xs text-slate-500">Lower numbers appear first.</p>
            </div>

            <div className="flex gap-4">
                <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={isLoading}
                >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {mode === "create" ? "Create FAQ" : "Update FAQ"}
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.back()}
                    className="text-slate-400 hover:text-white"
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
