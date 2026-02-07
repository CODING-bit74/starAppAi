import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, CreditCard } from "lucide-react"
import Link from "next/link"
import { deletePricingPlan } from "@/app/actions/billing"
import { Badge } from "@/components/ui/badge"

export default async function AdminPricingPage() {
    // @ts-ignore
    const plans = await prisma.pricingPlan.findMany({
        orderBy: { price: 'asc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Pricing Plans</h2>
                    <p className="text-slate-400">Manage your subscription packages.</p>
                </div>
                <Link href="/admin/pricing/new">
                    <Button variant="premium" className="bg-indigo-600 hover:bg-indigo-700">
                        <Plus className="mr-2 h-4 w-4" /> Add Plan
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan: any) => (
                    <div key={plan.id} className="rounded-xl border border-white/10 bg-[#0d1117] p-6 relative">
                        {plan.popular && (
                            <div className="absolute top-0 right-0 -mt-3 -mr-3">
                                <Badge className="bg-indigo-500 hover:bg-indigo-600">Popular</Badge>
                            </div>
                        )}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                            <CreditCard className="h-5 w-5 text-indigo-400" />
                        </div>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-white">
                                {plan.currency === 'USD' ? '$' : '₹'}{plan.price}
                            </span>
                            <span className="text-slate-400">/{plan.interval}</span>
                        </div>

                        <div className="space-y-3 mb-6">
                            {(() => {
                                let features: string[] = [];
                                try {
                                    const parsed = JSON.parse(plan.features);
                                    features = Array.isArray(parsed) ? parsed : [String(parsed)];
                                } catch (e) {
                                    features = typeof plan.features === 'string'
                                        ? (plan.features.includes(',') ? plan.features.split(',') : [plan.features])
                                        : [];
                                }
                                // Ensure it's an array of strings
                                return features.map((feature: string, i: number) => (
                                    <div key={i} className="flex items-center text-sm text-slate-300">
                                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                        {String(feature).trim()}
                                    </div>
                                ));
                            })()}
                        </div>

                        <form action={deletePricingPlan.bind(null, plan.id)}>
                            <Button variant="destructive" size="sm" className="w-full bg-red-500/10 text-red-400 hover:bg-red-500/20">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Plan
                            </Button>
                        </form>
                    </div>
                ))}

                {plans.length === 0 && (
                    <div className="col-span-full text-center py-12 border border-white/10 rounded-xl bg-white/5 border-dashed">
                        <p className="text-slate-400">No pricing plans created yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
