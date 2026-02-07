"use client";

import { useState, useTransition } from "react";
import { updateLeadStatus, deleteLead } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LeadActionsProps {
    id: string;
    currentStatus: string;
}

export function LeadActions({ id, currentStatus }: LeadActionsProps) {
    const [isPending, startTransition] = useTransition();

    const handleStatusChange = (newStatus: string) => {
        startTransition(() => {
            updateLeadStatus(id, newStatus);
        });
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this lead?")) {
            startTransition(() => {
                deleteLead(id);
            });
        }
    };

    const statusColors: Record<string, string> = {
        new: "bg-indigo-500 hover:bg-indigo-600",
        contacted: "bg-amber-500 hover:bg-amber-600",
        closed: "bg-slate-500 hover:bg-slate-600",
        won: "bg-green-500 hover:bg-green-600"
    };

    return (
        <div className="flex items-center gap-2 justify-end">
            <div className="relative group">
                <Badge
                    variant="secondary"
                    className={`${statusColors[currentStatus] || "bg-slate-700"} text-white cursor-pointer transition-all relative z-10 px-3 py-1`}
                >
                    {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : currentStatus}
                </Badge>

                {/* Custom Hover Dropdown for Status */}
                <div className="absolute right-0 top-full mt-1 w-32 bg-[#1c2128] border border-white/10 rounded-md shadow-xl overflow-hidden hidden group-hover:block transition-all z-20">
                    {["new", "contacted", "closed", "won"].map((status) => (
                        <div
                            key={status}
                            onClick={() => handleStatusChange(status)}
                            className={`px-3 py-2 text-xs text-slate-300 hover:bg-white/5 cursor-pointer capitalize ${currentStatus === status ? "text-indigo-400 font-medium" : ""}`}
                        >
                            {status}
                        </div>
                    ))}
                </div>
            </div>

            <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                disabled={isPending}
                className="text-slate-400 hover:text-red-400 hover:bg-red-400/10 h-8 w-8"
            >
                {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            </Button>
        </div>
    );
}
