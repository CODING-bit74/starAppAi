

import { LeadForm } from "@/components/LeadForm";
import { Star, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] bg-primary/5 blur-[120px] rounded-full"></div>
                <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary/10 blur-[100px] rounded-full"></div>
            </div>

            <header className="relative z-10 p-6 flex justify-between items-center container mx-auto">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="relative h-12 w-48 transition-opacity hover:opacity-90">
                        <Image
                            src="/Company_LOGO_Dark-BG.png"
                            alt="StarApp.AI Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>
                <div className="hidden sm:block">
                    <span className="text-sm text-muted-foreground mr-4">Already have an account?</span>
                    <Button variant="ghost" className="text-foreground hover:text-primary">Log In</Button>
                </div>
            </header>

            <main className="relative z-10 flex-1 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 py-12">
                <div className="max-w-xl text-center lg:text-left">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                        Supercharge your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-secondary animate-gradient">
                            Enterprise Workflow
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        Connect your data, deploy autonomous agents, and secure transactions on the blockchain. The all-in-one platform for the modern economy.
                    </p>

                    <div className="space-y-4 mb-8">
                        {['AI-Powered Analytics', 'Blockchain Verification', 'Automated Reporting', '24/7 Agent Swarms'].map((item) => (
                            <div key={item} className="flex items-center gap-3 text-muted-foreground">
                                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Check className="h-3 w-3 text-primary" />
                                </div>
                                {item}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 mb-12 lg:mb-0 justify-center lg:justify-start">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`h-10 w-10 rounded-full border-2 border-background bg-card flex items-center justify-center z-${10 - i}`}>
                                    <span className="text-xs text-muted-foreground">U{i}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col justify-center text-xs">
                            <span className="font-bold text-foreground">2,000+ Trusting Business</span>
                            <span className="text-muted-foreground">Rated 4.9/5 stars</span>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-md">
                    <LeadForm />
                </div>
            </main>

            <Footer />
        </div>
    );
}
