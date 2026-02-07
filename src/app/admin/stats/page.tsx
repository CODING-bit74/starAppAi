import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSystemStats, updateSystemStats } from "@/app/actions/stats";
import { Save } from "lucide-react";

export default async function AdminStatsPage() {
    const stats = await getSystemStats();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">System Statistics</h1>
                    <p className="text-slate-400">Manage the global statistics displayed on the landing page.</p>
                </div>
            </div>

            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Global Metrics</CardTitle>
                    <CardDescription>These numbers are public facing and help build trust.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={updateSystemStats} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="activeUsers" className="text-slate-200">Active Users</Label>
                                <Input
                                    id="activeUsers"
                                    name="activeUsers"
                                    defaultValue={stats.activeUsers}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="transactionsProcessed" className="text-slate-200">Transactions Processed</Label>
                                <Input
                                    id="transactionsProcessed"
                                    name="transactionsProcessed"
                                    defaultValue={stats.transactionsProcessed}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="aiPredictions" className="text-slate-200">AI Predictions</Label>
                                <Input
                                    id="aiPredictions"
                                    name="aiPredictions"
                                    defaultValue={stats.aiPredictions}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="uptimeGuarantee" className="text-slate-200">Uptime Guarantee</Label>
                                <Input
                                    id="uptimeGuarantee"
                                    name="uptimeGuarantee"
                                    defaultValue={stats.uptimeGuarantee}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="countriesServed" className="text-slate-200">Countries Served</Label>
                                <Input
                                    id="countriesServed"
                                    name="countriesServed"
                                    defaultValue={stats.countriesServed}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="clientRetention" className="text-slate-200">Client Retention</Label>
                                <Input
                                    id="clientRetention"
                                    name="clientRetention"
                                    defaultValue={stats.clientRetention}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="globalSupport" className="text-slate-200">Global Support</Label>
                                <Input
                                    id="globalSupport"
                                    name="globalSupport"
                                    defaultValue={stats.globalSupport}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
