"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Bot, BarChart2, Users, Settings, CreditCard, LayoutDashboard, LogOut } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const sidebarItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r border-border bg-background text-foreground">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2 px-2">
                    <div className="relative h-12 w-48 transition-opacity hover:opacity-90">
                        <Image
                            src="/Company_LOGO_Dark-BG.png"
                            alt="StarApp.AI Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>
            </div>
            <nav className="flex-1 space-y-1 px-4">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary border-r-2 border-primary"
                                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 border-t border-white/5">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                        // import("next-auth/react").then(mod => mod.signOut({ callbackUrl: "/" }))
                        window.location.href = "/"; // Placeholder logout
                    }}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                </Button>
            </div>
        </div>
    );
}
