"use client";

import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { Github, Linkedin, Twitter } from "lucide-react";

const founders = [
    {
        name: "Arpit Mishra",
        role: "Chief Executive Officer",
        bio: "Visionary leader with 10+ years in AI & Blockchain. Formerly at TechGiant exploring AGI.",
        image: "/file.svg",
        social: {
            twitter: "#",
            linkedin: "#",
            github: "#",
        },
    },
    {
        name: "Mohit Raj",
        role: "Chief Technology Officer",
        bio: "Architecting the future of decentralized autonomous agents. Expert in distributed systems.",
        image: "/window.svg",
        social: {
            twitter: "#",
            linkedin: "#",
            github: "#",
        },
    },
    {
        name: "Manik",
        role: "Chief Technology Officer",
        bio: "Architecting the future of decentralized autonomous agents. Expert in distributed systems.",
        image: "/window.svg",
        social: {
            twitter: "#",
            linkedin: "#",
            github: "#",
        },
    },
];

export function Founders() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Glow background */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15),transparent_70%)]" />

            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-white to-yellow-400 mb-4">
                        Meet the Visionaries
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        The minds behind the autonomous revolution — bridging the gap
                        between human intent and AI execution.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {founders.map((founder, index) => (
                        <Tilt
                            key={index}
                            tiltMaxAngleX={12}
                            tiltMaxAngleY={12}
                            scale={1.05}
                            transitionSpeed={1200}
                        >
                            <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-amber-500/40 via-yellow-500/30 to-orange-500/40 hover:from-amber-500 hover:to-orange-500 transition-all duration-500">
                                {/* Glow */}
                                <div className="absolute inset-0 rounded-2xl bg-amber-500/30 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

                                {/* Card */}
                                <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center min-h-[420px] transition-all duration-500 group-hover:-translate-y-2">

                                    {/* Avatar */}
                                    <div className="relative mb-6 group-hover:-translate-y-3 transition-transform duration-500">
                                        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-500 blur-md opacity-70" />
                                        <div className="relative h-28 w-28 rounded-full overflow-hidden border border-white/20 bg-stone-900 flex items-center justify-center text-4xl font-bold text-white/30">
                                            {founder.name.charAt(0)}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition">
                                        {founder.name}
                                    </h3>

                                    <p className="text-sm text-amber-400 font-semibold mb-4">
                                        {founder.role}
                                    </p>

                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        {founder.bio}
                                    </p>

                                    {/* Socials */}
                                    <div className="flex gap-5 mt-auto">
                                        <Link
                                            href={founder.social.twitter}
                                            className="relative group/icon"
                                        >
                                            <span className="absolute inset-0 rounded-full bg-amber-500/20 blur-md opacity-0 group-hover/icon:opacity-100 transition" />
                                            <Twitter className="relative h-5 w-5 text-slate-400 group-hover/icon:text-amber-400 transition-transform duration-300 group-hover/icon:scale-125" />
                                        </Link>

                                        <Link
                                            href={founder.social.linkedin}
                                            className="relative group/icon"
                                        >
                                            <span className="absolute inset-0 rounded-full bg-amber-500/20 blur-md opacity-0 group-hover/icon:opacity-100 transition" />
                                            <Linkedin className="relative h-5 w-5 text-slate-400 group-hover/icon:text-amber-400 transition-transform duration-300 group-hover/icon:scale-125" />
                                        </Link>

                                        <Link
                                            href={founder.social.github}
                                            className="relative group/icon"
                                        >
                                            <span className="absolute inset-0 rounded-full bg-amber-500/20 blur-md opacity-0 group-hover/icon:opacity-100 transition" />
                                            <Github className="relative h-5 w-5 text-slate-400 group-hover/icon:text-amber-400 transition-transform duration-300 group-hover/icon:scale-125" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Tilt>
                    ))}
                </div>
            </div>
        </section>
    );
}
