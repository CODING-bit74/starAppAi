// import { auth } from "@/auth"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreditCard, Rocket, Clock } from "lucide-react";

export default async function DashboardPage() {
    // const session = await auth();
    // const user = session?.user;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Welcome back!</h1>
                <p className="text-slate-400 mt-2">Here is an overview of your account activity.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-white/5 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">Active Plan</CardTitle>
                        <Rocket className="h-4 w-4 text-indigo-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">Free Tier</div>
                        <p className="text-xs text-slate-400">Upgrade to unlock more features</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">Billing Status</CardTitle>
                        <CreditCard className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">Active</div>
                        <p className="text-xs text-slate-400">Next billing date: N/A</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">Member Since</CardTitle>
                        <Clock className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">Today</div>
                        <p className="text-xs text-slate-400">Joined via Email</p>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
                <div className="flex gap-4">
                    <Button variant="outline" className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10" asChild>
                        <Link href="/pricing">Upgrade Plan</Link>
                    </Button>
                    <Button variant="ghost" className="text-slate-400 hover:text-white" asChild>
                        <Link href="/dashboard/settings">Account Settings</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
