"use client";

import { useState, useTransition, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { createOrder } from "@/app/actions/billing";
import { Loader2, CheckCircle2, CreditCard, Wallet, Shield, Lock, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react"; // Removed
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function CheckoutForm({ plan }: { plan: any }) {
    const [isPending, startTransition] = useTransition();
    const [processingStep, setProcessingStep] = useState<number>(0); // 0: Idle, 1: Connecting, 2: Verifying, 3: Authorizing, 4: Success
    const router = useRouter();
    // const { data: session } = useSession(); // Removed

    // Form States for Validation
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [upiId, setUpiId] = useState("");
    const [error, setError] = useState("");

    const steps = [
        "Establishing secure connection...",
        "Verifying payment details...",
        "Authorizing transaction with bank...",
        "Payment Successful!"
    ];

    // Card Input Formatting
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '').substring(0, 16);
        value = value.match(/.{1,4}/g)?.join(' ') || value;
        setCardNumber(value);
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (value.length >= 2) value = value.substring(0, 2) + '/' + value.substring(2);
        setExpiry(value);
    };

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        // Validation
        if (paymentMethod === "card") {
            if (cardNumber.replace(/\s/g, '').length !== 16) {
                setError("Invalid card number. Please enter 16 digits.");
                return;
            }
            if (expiry.length !== 5) {
                setError("Invalid expiry date (MM/YY).");
                return;
            }
            if (cvc.length < 3) {
                setError("Invalid CVC.");
                return;
            }
        } else if (paymentMethod === "upi") {
            if (!upiId.includes("@")) {
                setError("Invalid UPI ID. Must contain '@'.");
                return;
            }
        }

        const formData = new FormData(event.currentTarget);

        // Start Realistic Simulation
        setProcessingStep(1); // Connecting

        // Step 2: Verifying (after 1.5s)
        setTimeout(() => setProcessingStep(2), 1500);

        // Step 3: Authorizing (after 3s total)
        setTimeout(() => {
            setProcessingStep(3);

            startTransition(async () => {
                // @ts-ignore
                await createOrder({
                    planId: plan.id,
                    amount: plan.price,
                    currency: plan.currency,
                    method: paymentMethod,
                    customerName: formData.get("name") as string,
                    customerEmail: formData.get("email") as string,
                    // userId: session?.user?.id // Removed
                });

                // Step 4: Success
                setProcessingStep(4);
                setTimeout(() => router.push("/dashboard"), 2000);
            });
        }, 3500);
    }

    if (processingStep === 4) {
        return (
            <Card className="w-full max-w-md bg-white/5 border-white/10 animate-in fade-in zoom-in duration-300">
                <CardContent className="pt-12 pb-12 text-center space-y-6">
                    <div className="mx-auto h-20 w-20 bg-green-500/20 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10 text-green-500 animate-bounce" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
                        <p className="text-slate-400 text-lg">Your subscription is now active.</p>
                    </div>
                    <div className="pt-4">
                        <Loader2 className="h-6 w-6 text-amber-500 animate-spin mx-auto" />
                        <p className="text-sm text-slate-500 mt-2">Redirecting you to dashboard...</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (processingStep > 0) {
        return (
            <Card className="w-full max-w-md bg-[#0d1117] border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-white text-xl flex items-center justify-center gap-2">
                        <Lock className="h-5 w-5 text-amber-400" />
                        Secure Payment
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-8 pb-12 space-y-8">
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="h-24 w-24 rounded-full border-4 border-white/10 border-t-amber-500 animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Shield className="h-8 w-8 text-amber-500" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 text-center">
                        <h3 className="text-lg font-medium text-white animate-pulse">
                            {steps[processingStep - 1]}
                        </h3>
                        <p className="text-sm text-slate-500">Please do not close this window.</p>
                    </div>

                    <div className="space-y-2">
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-amber-500 transition-all duration-1000 ease-out"
                                style={{ width: `${processingStep * 33}%` }}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-lg bg-white/5 backdrop-blur-md border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
            <CardHeader className="relative z-10">
                <CardTitle className="text-white text-2xl">Checkout</CardTitle>
                <CardDescription className="text-slate-400">Complete your subscription to <strong className="text-amber-400">{plan.name}</strong></CardDescription>
                <div className="mt-4 p-4 rounded-lg bg-black/40 border border-white/10 flex justify-between items-center text-white">
                    <span>Total due today</span>
                    <span className="text-xl font-bold text-amber-400">{plan.currency === 'USD' ? '$' : '₹'}{plan.price}</span>
                </div>
            </CardHeader>
            <CardContent className="relative z-10">
                <form onSubmit={onSubmit} className="space-y-6">
                    {error && (
                        <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-slate-200">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                required
                                defaultValue={""}
                                placeholder="John Doe"
                                className="bg-black/20 border-white/10 text-white focus:border-amber-500 focus:ring-amber-500/20"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-slate-200">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                defaultValue={""}
                                placeholder="john@example.com"
                                className="bg-black/20 border-white/10 text-white focus:border-amber-500 focus:ring-amber-500/20"
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label className="text-slate-200">Payment Method</Label>
                        <Tabs defaultValue="card" className="w-full" onValueChange={setPaymentMethod}>
                            <TabsList className="grid w-full grid-cols-2 bg-black/40">
                                <TabsTrigger value="card" className="data-[state=active]:bg-amber-600 data-[state=active]:text-black font-medium">
                                    <CreditCard className="mr-2 h-4 w-4" /> Card
                                </TabsTrigger>
                                <TabsTrigger value="upi" className="data-[state=active]:bg-amber-600 data-[state=active]:text-black font-medium">
                                    <Wallet className="mr-2 h-4 w-4" /> UPI
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="card" className="mt-4 space-y-4">
                                <Input name="paymentMethod" type="hidden" value="card" />
                                <div className="grid gap-2">
                                    <Label htmlFor="cardNumber" className="text-slate-200">Card Number</Label>
                                    <div className="relative">
                                        <Input
                                            id="cardNumber"
                                            value={cardNumber}
                                            onChange={handleCardNumberChange}
                                            placeholder="0000 0000 0000 0000"
                                            className="bg-black/20 border-white/10 text-white font-mono pl-10 focus:border-amber-500 focus:ring-amber-500/20"
                                            maxLength={19}
                                        />
                                        <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="expiry" className="text-slate-200">Expiry</Label>
                                        <Input
                                            id="expiry"
                                            value={expiry}
                                            onChange={handleExpiryChange}
                                            placeholder="MM/YY"
                                            className="bg-black/20 border-white/10 text-white font-mono focus:border-amber-500 focus:ring-amber-500/20"
                                            maxLength={5}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="cvc" className="text-slate-200">CVC</Label>
                                        <Input
                                            id="cvc"
                                            value={cvc}
                                            onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                                            placeholder="123"
                                            className="bg-black/20 border-white/10 text-white font-mono focus:border-amber-500 focus:ring-amber-500/20"
                                            maxLength={4}
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="upi" className="mt-4 space-y-4">
                                <Input name="paymentMethod" type="hidden" value="upi" />
                                <div className="grid gap-2">
                                    <Label htmlFor="upiId" className="text-slate-200">UPI ID</Label>
                                    <div className="relative">
                                        <Input
                                            id="upiId"
                                            value={upiId}
                                            onChange={(e) => setUpiId(e.target.value)}
                                            placeholder="username@oksbi"
                                            className="bg-black/20 border-white/10 text-white pl-10 focus:border-amber-500 focus:ring-amber-500/20"
                                        />
                                        <Wallet className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-10 w-16 bg-white/10 rounded flex items-center justify-center text-xs text-slate-300 border border-white/5 cursor-pointer hover:bg-white/20 transition-colors">GPay</div>
                                    <div className="h-10 w-16 bg-white/10 rounded flex items-center justify-center text-xs text-slate-300 border border-white/5 cursor-pointer hover:bg-white/20 transition-colors">PhonePe</div>
                                    <div className="h-10 w-16 bg-white/10 rounded flex items-center justify-center text-xs text-slate-300 border border-white/5 cursor-pointer hover:bg-white/20 transition-colors">Paytm</div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black h-11 text-lg font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all hover:scale-[1.02]" disabled={isPending}>
                        Pay {plan.currency === 'USD' ? '$' : '₹'}{plan.price}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="justify-center border-t border-white/5 pt-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Shield className="h-3 w-3" /> 256-bit SSL Encrypted Payment
                </div>
            </CardFooter>
        </Card>
    );
}
