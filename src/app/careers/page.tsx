import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

const PERKS = [
    "Remote-first culture with global offsites",
    "Competitive equity & token grants",
    "Premium health, dental, and vision insurance",
    "Unlimted PTO policy",
    "Latest hardware (MacBook Pro + Monitor)",
    "Learning & Development stipend"
];

export default async function CareersPage() {
    // @ts-ignore
    const jobs = await prisma.job.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="min-h-screen flex flex-col bg-[#0B0F19]">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-indigo-500/5 blur-[120px] rounded-full -top-1/2 left-1/2 -translate-x-1/2" />
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <Badge variant="outline" className="mb-6 border-indigo-500/50 text-indigo-400 bg-indigo-500/10">
                            We are hiring
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                            Build the Future of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                                Autonomous Enterprise
                            </span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                            Join a world-class team of engineers, researchers, and builders defining the intersection of AI agents and blockchain infrastructure.
                        </p>
                        <Link href="#open-positions">
                            <Button
                                size="lg"
                                variant="premium"
                                className="rounded-full px-8"
                            >
                                View Open Roles
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Culture / Perks */}
                <section className="py-20 bg-white/5 border-y border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-6">Why Join StarApp.AI?</h2>
                                <p className="text-slate-400 mb-8">
                                    We are tackling some of the hardest problems in computer science. You will work with the brightest minds to build infrastructure that will power the next generation of the internet.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {PERKS.map((perk, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                                            <span className="text-sm text-slate-300">{perk}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50 group">
                                <Image
                                    src="/glassdoor-bg.png"
                                    alt="StarApp.AI Office Culture"
                                    fill
                                    className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 via-transparent to-cyan-500/40" />
                                <div className="absolute inset-0 flex items-center justify-center relative z-10">
                                    <div className="text-center">
                                        <div className="text-5xl font-bold text-white mb-2">4.5/5</div>
                                        <div className="text-slate-200 font-medium">Glassdoor Rating</div>

                                        <div className="flex gap-1 justify-center mt-3">
                                            {[1, 2, 3, 4].map(i => <span key={i} className="text-green-400">★</span>)}
                                            <span className="text-green-400/50">★</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Open Positions */}
                <section id="open-positions" className="py-24 container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">Open Positions</h2>
                    <div className="grid gap-6 max-w-4xl mx-auto">
                        {jobs.length === 0 ? (
                            <div className="text-center text-slate-500 py-12 border border-white/10 rounded-lg bg-white/5">
                                <p>No positions currently available. Please check back later.</p>
                            </div>
                        ) : (
                            jobs.map((role: any) => (
                                <Card key={role.id} className="bg-white/5 border-white/10 hover:border-indigo-500/50 transition-colors group">
                                    <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
                                        <div>
                                            <CardTitle className="text-xl text-white group-hover:text-indigo-400 transition-colors">
                                                {role.title}
                                            </CardTitle>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin className="h-3.5 w-3.5" /> {role.location}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="h-3.5 w-3.5" /> {role.type}
                                                </span>
                                            </div>
                                        </div>
                                        <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 w-fit">
                                            {role.department}
                                        </Badge>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-400 text-sm line-clamp-2">{role.description}</p>
                                    </CardContent>
                                    <CardFooter className="pt-0 flex justify-end">
                                        <Link href={`/careers/${role.id}/apply`}>
                                            <Button variant="ghost" className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 group/btn">
                                                Apply Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
