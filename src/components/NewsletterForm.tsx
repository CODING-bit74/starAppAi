"use client";

import { subscribe } from "@/app/actions/newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function NewsletterForm() {
    return (
        <form
            className="flex flex-col gap-2"
            onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const btn = e.currentTarget.querySelector("button");
                if (btn) btn.disabled = true;

                const res = await subscribe(formData);

                if (btn) btn.disabled = false;

                if (res?.success) {
                    alert("Subscribed successfully!");
                    (e.target as HTMLFormElement).reset();
                } else {
                    alert(res?.error || "Something went wrong");
                }
            }}
        >
            <div className="flex gap-2">
                <Input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                />
                <Button size="icon" variant="premium" className="shrink-0 bg-indigo-600 hover:bg-indigo-700">
                    <Mail className="h-4 w-4" />
                </Button>
            </div>
        </form>
    );
}
