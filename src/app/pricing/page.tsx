import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../components/ui/accordion";

export default async function PricingPage() {
    // console.log('Prisma Keys:', Object.keys(prisma));
    const plans = await prisma.pricingPlan.findMany({
        orderBy: { price: 'asc' }
    });

    // @ts-ignore
    const faqs = await prisma.faq.findMany({
        orderBy: { order: 'asc' }
    });

    // Fallback if no FAQs are seeded yet
    const displayFaqs = faqs.length > 0 ? faqs : [
        {
            question: "How does the 'Autonomous' part work?",
            answer: "Our agents operate independently based on the high-level goals you set. They use our proprietary Neural Mesh to break down goals into tasks, execute them, and report back. You don't need to script every step."
        },
        {
            question: "Is my data secure?",
            answer: "Absolutely. We rely on blockchain immutability for audit logs and use enterprise-grade encryption for all data in transit and at rest. The Enterprise plan also offers private chain deployments."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#020617] text-white overflow-hidden relative">
            <Navbar />

            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/0 via-[#020617]/0 to-[#020617] pointer-events-none" />

            <main className="flex-1 py-32 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <Badge variant="outline" className="mb-4 border-amber-500/30 text-amber-500 bg-amber-500/10 px-4 py-1">
                            Transparent Pricing
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-amber-100 to-amber-600 pb-2">
                            Invest in your Growth
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            Choose the perfect plan to scale your business with autonomous AI agents.
                            <br className="hidden md:block" /> No hidden fees, cancel anytime.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-32">
                        {plans.map((plan: any) => (
                            <Card
                                key={plan.id}
                                className={`relative border-white/10 bg-white/5 backdrop-blur-md flex flex-col transition-all duration-300 hover:-translate-y-2 group ${plan.popular
                                    ? 'border-amber-500/50 shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)] z-10 scale-105'
                                    : 'hover:border-amber-500/30 hover:shadow-xl'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-5 left-0 right-0 flex justify-center">
                                        <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-4 py-1.5 text-sm uppercase tracking-widest font-bold shadow-lg border-0">
                                            <Sparkles className="w-3.5 h-3.5 mr-2 fill-black" />
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}

                                <CardHeader className="text-center pb-2 pt-12">
                                    <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
                                    <CardDescription className="text-slate-400">Perfect for growing teams</CardDescription>
                                </CardHeader>

                                <CardContent className="flex-1 text-center px-6">
                                    <div className="mb-8 flex items-baseline justify-center">
                                        <span className="text-5xl font-extrabold text-white tracking-tight">
                                            {plan.currency === 'USD' ? '$' : '₹'}{plan.price}
                                        </span>
                                        <span className="text-slate-400 ml-2 text-lg font-medium">/{plan.interval}</span>
                                    </div>

                                    <div className="space-y-4 text-left bg-black/40 rounded-xl p-6 border border-white/5">
                                        {(() => {
                                            let features = [];
                                            try {
                                                features = JSON.parse(plan.features);
                                            } catch (e) {
                                                features = typeof plan.features === 'string'
                                                    ? (plan.features.includes(',') ? plan.features.split(',') : [plan.features])
                                                    : [];
                                            }
                                            if (!Array.isArray(features)) features = [String(features)];

                                            return features.map((feature: string, i: number) => (
                                                <div key={i} className="flex items-start">
                                                    <div className="mr-3 p-1 rounded-full bg-amber-500/10 text-amber-500 shrink-0 mt-0.5 border border-amber-500/20">
                                                        <Check className="h-3 w-3" />
                                                    </div>
                                                    <span className="text-slate-300 text-sm font-medium leading-tight">
                                                        {String(feature).trim()}
                                                    </span>
                                                </div>
                                            ));
                                        })()}
                                    </div>
                                </CardContent>

                                <CardFooter className="px-6 pb-8">
                                    <Link href={`/checkout/${plan.id}`} className="w-full">
                                        <Button
                                            size="lg"
                                            className={`w-full h-12 text-base font-bold tracking-wide transition-all border-0 ${plan.popular
                                                ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]'
                                                : 'bg-white/10 hover:bg-white/20 text-white hover:text-amber-500'
                                                }`}
                                        >
                                            Get Started Now
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {/* FAQ Section */}
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                            <p className="text-slate-400">Everything you need to know about our platform and billing.</p>
                        </div>

                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {displayFaqs.map((faq: any, i: number) => (
                                <AccordionItem key={i} value={`item-${i}`} className="border border-white/10 bg-white/5 rounded-xl px-4 overflow-hidden">
                                    <AccordionTrigger className="text-white hover:text-amber-400 hover:no-underline py-4 text-left text-lg font-medium">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-400 pb-4 text-base leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
