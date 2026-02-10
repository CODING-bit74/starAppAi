"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FileText,
    Settings,
    Briefcase,
    Users,
    Shield,
    BarChart3,
    Mail,
    Info,
    Megaphone,
    LayoutTemplate,
    MessageSquare,
    CheckSquare,
    Lightbulb,
    LogOut,
    HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const adminItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/admin" },
    { label: "Manage Blogs", icon: FileText, href: "/admin/blogs" },
    { label: "Manage Projects", icon: Briefcase, href: "/admin/projects" },
    { label: "Careers", icon: Briefcase, href: "/admin/careers" },
    { label: "Our Story", icon: FileText, href: "/admin/docs" },
    { label: "Leads", icon: Users, href: "/admin/leads" },
    { label: "Blog Posts", icon: FileText, href: "/admin/posts" },
    { label: "User Management", icon: Users, href: "/admin/users" },
    { label: "Services", icon: CheckSquare, href: "/admin/services" },
    { label: "Solutions", icon: Lightbulb, href: "/admin/solutions" },
    { label: "Chatbot Brain", icon: MessageSquare, href: "/admin/chat" },
    { label: "Stats", icon: BarChart3, href: "/admin/stats" },
    { label: "Newsletter", icon: Mail, href: "/admin/newsletter" },
    { label: "Case Studies", icon: FileText, href: "/admin/case-studies" },
    { label: "About Section", icon: Info, href: "/admin/about" },
    { label: "Hero Cards", icon: LayoutTemplate, href: "/admin/hero" },
    { label: "CTA Section", icon: Megaphone, href: "/admin/cta" },
    { label: "FAQs", icon: HelpCircle, href: "/admin/faqs" },
    { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r border-white/5 bg-[#0B0F19] text-white">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2 px-2">
                    <div className="h-8 w-8 rounded-lg bg-red-600 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">
                        Admin Panel
                    </span>
                </Link>
            </div>
            <nav className="flex-1 space-y-1 px-4 overflow-y-auto">
                {adminItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-red-500/10 text-red-400"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
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
                    className="w-full justify-start gap-3 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </Button>
            </div>
        </div >
    );
}
