import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Using textarea for simple feature list
import { createPricingPlan } from "@/app/actions/billing";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function NewPricingPlanPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/pricing">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4 text-white" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">New Plan</h2>
                    <p className="text-muted-foreground">Create a new subscription tier.</p>
                </div>
            </div>

            <Card className="bg-white/5 border-white/10">
                <form action={createPricingPlan}>
                    <CardHeader>
                        <CardTitle className="text-white">Plan Details</CardTitle>
                        <CardDescription>Configure pricing and features.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-slate-200">Plan Name</Label>
                            <Input id="name" name="name" required placeholder="e.g. Pro, Enterprise" className="bg-white/5 border-white/10 text-white" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="price" className="text-slate-200">Price</Label>
                                <Input id="price" name="price" type="number" step="0.01" required placeholder="29.99" className="bg-white/5 border-white/10 text-white" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="currency" className="text-slate-200">Currency</Label>
                                <Input id="currency" name="currency" defaultValue="USD" required placeholder="USD" className="bg-white/5 border-white/10 text-white" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="interval" className="text-slate-200">Billing Interval</Label>
                            <Input id="interval" name="interval" defaultValue="month" required placeholder="month / year" className="bg-white/5 border-white/10 text-white" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="features" className="text-slate-200">Features (JSON Array)</Label>
                            <Textarea
                                id="features"
                                name="features"
                                required
                                placeholder='["Feature 1", "Feature 2"]'
                                className="font-mono text-xs bg-white/5 border-white/10 text-white h-24"
                            />
                            <p className="text-xs text-slate-500">Enter features as a JSON array of strings.</p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch id="popular" name="popular" />
                            <Label htmlFor="popular" className="text-slate-200">Mark as Popular</Label>
                        </div>

                    </CardContent>
                    <CardFooter className="border-t border-white/5 px-6 py-4 flex justify-end">
                        <Button type="submit" variant="premium" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            Create Plan
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
