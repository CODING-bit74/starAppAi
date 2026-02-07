"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Smartphone, Bot, Database, Globe, Github } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Mapping categories/tags to icons
const getIcon = (category: string) => {
    if (category.includes("Mobile")) return Smartphone;
    if (category.includes("Intelligence") || category.includes("AI")) return Bot;
    if (category.includes("Blockchain")) return Database;
    return Globe;
};

const getColor = (category: string) => {
    if (category.includes("Mobile")) return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    if (category.includes("Intelligence") || category.includes("AI")) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    if (category.includes("Blockchain")) return "text-orange-400 bg-orange-400/10 border-orange-400/20";
    return "text-slate-200 bg-slate-200/10 border-slate-200/20";
}

export function ProjectsList({ projects }: { projects: any[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => {
                const Icon = getIcon(project.category);
                const colorClass = getColor(project.category);

                // Parse tags
                const tags = typeof project.tags === 'string'
                    ? project.tags.split(',').map((t: string) => t.trim())
                    : project.tags || [];

                return (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full border-white/10 bg-white/5 backdrop-blur-md hover:border-amber-500/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_0_30px_-10px_rgba(245,158,11,0.3)]">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-xl border ${colorClass} backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex gap-2 relative z-20">
                                        {project.repoUrl && (
                                            <div className="flex gap-2">
                                                <Link href={project.repoUrl} target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5 hover:border-white/20">
                                                    <Github className="h-4 w-4" />
                                                </Link>
                                                {project.demoUrl && (
                                                    <Link href={project.demoUrl} target="_blank" className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 hover:text-amber-400 transition-colors border border-amber-500/20">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </Link>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs font-bold uppercase tracking-wider text-amber-500/80">{project.category}</span>
                                    <Link href={`/projects/${project.slug}`} className="block group-hover:text-amber-400 transition-colors">
                                        <CardTitle className="text-2xl text-white font-bold">
                                            {project.title}
                                        </CardTitle>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-slate-400 text-base mb-6 line-clamp-3 leading-relaxed">
                                    {project.description}
                                </CardDescription>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag: string) => (
                                        <Badge key={tag} variant="outline" className="bg-white/5 border-white/10 text-slate-300 hover:border-amber-500/30 hover:text-amber-200 transition-colors">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                );
            })}
        </div>
    );
}
