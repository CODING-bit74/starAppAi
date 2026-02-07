"use client";

import { motion } from "framer-motion";

export function Stats({ stats }: { stats?: any }) {
    const data = [
        { label: "Active Users", value: stats?.activeUsers || "50K+" },
        { label: "Transactions Processed", value: stats?.transactionsProcessed || "$2B+" },
        { label: "AI Predictions", value: stats?.aiPredictions || "10M+" },
        { label: "Uptime Guarantee", value: stats?.uptimeGuarantee || "99.9%" },
    ];

    return (
        <section className="py-20 border-y border-white/10 bg-[#020617]/50 backdrop-blur-sm relative">
            <div className="absolute inset-0 bg-amber-500/5 -z-10" />
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {data.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-amber-200 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-amber-500/80 font-bold uppercase tracking-wider text-sm">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
