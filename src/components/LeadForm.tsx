"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function LeadForm() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => setSubmitted(true), 1000);
    }

    return (
        <Card className="w-full max-w-md mx-auto bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
                <CardTitle className="text-2xl text-white">Get Early Access</CardTitle>
                <CardDescription className="text-slate-400">
                    Join 2,000+ companies transforming their workflow.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {submitted ? (
                    <div className="flex flex-col items-center justify-center text-center py-6 space-y-4">
                        <CheckCircle2 className="h-16 w-16 text-green-500" />
                        <h3 className="text-xl font-medium text-white">You&apos;re on the list!</h3>
                        <p className="text-sm text-slate-400">We&apos;ll be in touch shortly with your exclusive access key.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Input placeholder="Full Name" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" required />
                        </div>
                        <div className="space-y-2">
                            <Input type="email" placeholder="Work Email" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" required />
                        </div>
                        <div className="space-y-2">
                            <Input placeholder="Company Name" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
                        </div>
                        <Button type="submit" variant="premium" className="w-full">
                            Request Access <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <p className="text-xs text-center text-slate-500 mt-4">
                            No credit card required. Free 14-day trial included.
                        </p>
                    </form>
                )}
            </CardContent>
        </Card>
    );
}
