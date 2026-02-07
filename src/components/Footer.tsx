

import Link from "next/link";
import Image from "next/image";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getAboutInfo } from "@/app/actions/about";

export async function Footer() {
    const info = await getAboutInfo();

    return (
        <footer className="border-t border-white/10 bg-[#020617] pt-20 pb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-amber-900/10 via-[#020617] to-[#020617] -z-10" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div>


                        <Link href="/" className="flex items-center gap-2 mb-7">
                            <div className="relative h-50 w-72 transition-opacity hover:opacity-90">
                                <Image
                                    src="/Company_LOGO_Dark-BG.png"
                                    alt="StarApp.AI Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Empowering enterprises with autonomous AI agents and blockchain infrastructure. Convert your ideas into reality.
                        </p>
                        <div className="flex gap-4">
                            <Link href={info.twitterUrl || "#"} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-amber-500/10 transition-all border border-white/10 hover:border-amber-500/30 group">
                                <Twitter className="h-5 w-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                            </Link>
                            <Link href={info.githubUrl || "#"} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-amber-500/10 transition-all border border-white/10 hover:border-amber-500/30 group">
                                <Github className="h-5 w-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                            </Link>
                            <Link href={info.linkedinUrl || "#"} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-amber-500/10 transition-all border border-white/10 hover:border-amber-500/30 group">
                                <Linkedin className="h-5 w-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                            </Link>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-bold text-white mb-6">Product</h3>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link href="/#features" className="hover:text-amber-400 transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-amber-400 transition-colors">Pricing</Link></li>
                            <li><Link href="/case-studies" className="hover:text-amber-400 transition-colors">Case Studies</Link></li>
                            <li><Link href="/our-story" className="hover:text-amber-400 transition-colors">Our Story</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-bold text-white mb-6">Company</h3>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link href="/#about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
                            <li><Link href="/careers" className="hover:text-amber-400 transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-amber-400 transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold text-white mb-6">Stay Updated</h3>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Subscribe to our newsletter for the latest AI & Blockchain insights.
                        </p>
                        <NewsletterForm />
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} StarAppAi. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-sm text-slate-500">
                        <Link href="/legal/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
                        <Link href="/legal/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
                        <Link href="/legal/cookies" className="hover:text-amber-400 transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
