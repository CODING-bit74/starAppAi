import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// @ts-ignore
export default async function CheckoutPage({ params }: { params: Promise<{ planId: string }> }) {
    const { planId } = await params;

    // @ts-ignore
    const plan = await prisma.pricingPlan.findUnique({
        where: { id: planId }
    });

    if (!plan) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#020617] text-white relative overflow-hidden">
            <Navbar />

            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/0 via-[#020617]/0 to-[#020617] pointer-events-none" />

            <div className="flex-1 container mx-auto px-4 py-20 flex items-center justify-center relative z-10">
                <CheckoutForm plan={plan} />
            </div>
            <Footer />
        </div>
    );
}
