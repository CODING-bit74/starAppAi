import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Briefcase, Activity } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
    // Parallel data fetching
    const [userCount, postCount, projectCount, systemStats] = await Promise.all([
        prisma.user.count(),
        prisma.post.count(),
        prisma.project.count(),
        prisma.systemStats.findFirst()
    ]);

    // Calculate post stats if needed, for now just total
    const publishedPosts = await prisma.post.count({ where: { published: true } });
    const draftPosts = postCount - publishedPosts;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Admin Dashboard</h2>
                <p className="text-muted-foreground">System-wide overview and management.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white/5 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{userCount}</div>
                        <p className="text-xs text-muted-foreground">Registered accounts</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">Blog Posts</CardTitle>
                        <FileText className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{postCount}</div>
                        <p className="text-xs text-muted-foreground">{publishedPosts} published, {draftPosts} drafts</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">Projects</CardTitle>
                        <Briefcase className="h-4 w-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{projectCount}</div>
                        <p className="text-xs text-muted-foreground">Active Portfolio Items</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">System Health</CardTitle>
                        <Activity className="h-4 w-4 text-red-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{systemStats?.uptimeGuarantee || "99.9%"}</div>
                        <p className="text-xs text-muted-foreground">Uptime</p>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center">
                <h3 className="text-lg font-medium text-white mb-2">Welcome, Admin</h3>
                <p className="text-slate-400">Select a section from the sidebar to manage content.</p>
            </div>
        </div>
    );
}
