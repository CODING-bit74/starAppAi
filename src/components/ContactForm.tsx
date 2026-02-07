"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";

import { submitLead } from "@/app/actions/contact";

export function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);

        try {
            await submitLead(formData);
            setIsSuccess(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isSuccess) {
        return (
            <Card className="w-full max-w-md mx-auto bg-white/5 border-amber-500/50 backdrop-blur-md animate-in fade-in zoom-in duration-300">
                <CardContent className="pt-6 flex flex-col items-center text-center p-8">
                    <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4 border border-green-500/30">
                        <Check className="h-6 w-6 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-400">
                        Thank you for reaching out. Our team will review your requirements and get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-6 border-amber-500/50 text-amber-500 hover:bg-amber-500/10 hover:text-amber-400">
                        Send Another Message
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-xl mx-auto bg-white/5 backdrop-blur-md border-white/10 hover:border-amber-500/30 transition-all duration-300 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
            <CardHeader className="relative z-10">
                <CardTitle className="text-2xl text-white">Contact Us</CardTitle>
                <CardDescription className="text-slate-400">
                    Tell us about your project and requirements.
                </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-slate-200">First name</Label>
                            <Input id="firstName" name="firstName" required placeholder="John" className="bg-black/20 border-white/10 text-white focus:border-amber-500 focus:ring-amber-500/20 placeholder:text-slate-600" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-slate-200">Last name</Label>
                            <Input id="lastName" name="lastName" required placeholder="Doe" className="bg-black/20 border-white/10 text-white focus:border-amber-500 focus:ring-amber-500/20 placeholder:text-slate-600" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-200">Email</Label>
                        <Input id="email" name="email" type="email" required placeholder="john@company.com" className="bg-black/20 border-white/10 text-white focus:border-amber-500 focus:ring-amber-500/20 placeholder:text-slate-600" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="budget" className="text-slate-200">Budget Range</Label>
                        <select
                            id="budget"
                            name="budget"
                            className="flex h-10 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                        >
                            <option value="" className="bg-[#0B0F19] text-slate-500">Select Budget</option>
                            <option value="5-10k" className="bg-[#0B0F19]">$5k - $10k</option>
                            <option value="10-50k" className="bg-[#0B0F19]">$10k - $50k</option>
                            <option value="50-100k" className="bg-[#0B0F19]">$50k - $100k</option>
                            <option value="100k+" className="bg-[#0B0F19]">$100k+</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="requirement" className="text-slate-200">Project Requirements</Label>
                        <Textarea
                            id="requirement"
                            name="requirement"
                            required
                            placeholder="Describe your project needs, technologies of interest, and goals..."
                            className="min-h-[100px] bg-black/20 border-white/10 text-white focus:border-amber-500 focus:ring-amber-500/20 placeholder:text-slate-600"
                        />
                    </div>

                    <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold h-11 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all hover:scale-[1.02]" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            "Submit Request"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
