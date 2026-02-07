"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    CreditCard,
    Settings,
    LogOut,
    HelpCircle,
    FileText,
    Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";

const userItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { label: "My Billing", icon: CreditCard, href: "/dashboard/billing" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
    { label: "Support", icon: HelpCircle, href: "/dashboard/support" },
];

export function UserSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r border-white/5 bg-[#0B0F19] text-white">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2 px-2">
                    <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">
                        My Dashboard
                    </span>
                </Link>
            </div>
            <nav className="flex-1 space-y-1 px-4">
                {userItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-indigo-500/10 text-indigo-400"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

        </div>
    );
}
