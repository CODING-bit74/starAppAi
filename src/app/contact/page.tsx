import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function ContactPage() {
    // @ts-ignore
    const info = await prisma.contactInfo.findFirst();

    const email = info?.email || "contact@starapp.ai";
    const phone = info?.phone || "+1 (555) 123-4567";
    const address = info?.address || "123 Innovation Drive, Tech City, TC 94000";

    return (
        <div className="min-h-screen flex flex-col bg-[#020617] relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3 opacity-60" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3" />

            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="flex flex-col justify-center">
                        <span className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-3">Get in Touch</span>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-amber-100">
                            Let&apos;s Build Something Extraordinary
                        </h1>
                        <p className="text-lg text-slate-400 mb-12 max-w-lg leading-relaxed">
                            Whether you need a custom AI agent, blockchain infrastructure, or a full-scale digital transformation, our team is ready to help.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 group-hover:scale-110 transition-transform">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors">Email Us</h3>
                                    <p className="text-slate-400">{email}</p>
                                    <p className="text-slate-400">sales@starapp.ai</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 group-hover:scale-110 transition-transform">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors">Call Us</h3>
                                    <p className="text-slate-400">{phone}</p>
                                    <p className="text-slate-500 text-sm">Mon-Fri from 8am to 5pm EST</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 group-hover:scale-110 transition-transform">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors">Visit Us</h3>
                                    <p className="text-slate-400 whitespace-pre-line">
                                        {address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <ContactForm />
                    </div>
                </div>
            </main>
        </div>
    );
}
