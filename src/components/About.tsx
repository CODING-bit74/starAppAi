"use client";

import { motion } from "framer-motion";
import { Founders } from "@/components/Founders";

export function About({ data }: { data: any }) {
    if (!data) return null;

    return (
        <section id="about" className="py-24 bg-[#020617] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

            <div className="container mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <span className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-3 block">About Us</span>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">{data.title}</h2>
                    <p className="text-lg text-slate-400 mb-12 leading-relaxed">
                        {data.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-4">
                            <h3 className="text-5xl font-bold text-amber-500 mb-2">{data.stat1Value}</h3>
                            <p className="text-sm text-slate-400">{data.stat1Label}</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-5xl font-bold text-yellow-500 mb-2">{data.stat2Value}</h3>
                            <p className="text-sm text-slate-400">{data.stat2Label}</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-5xl font-bold text-amber-600 mb-2">{data.stat3Value}</h3>
                            <p className="text-sm text-slate-400">{data.stat3Label}</p>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-24">
                    <Founders />
                </div>
            </div>
        </section>
    );
}
