"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, GitFork, Eye, ArrowLeft, Download, Folder, FileCode, GitBranch, History, ChevronDown, Link as LinkIcon, Copy, Check, CircleDot, GitPullRequest, PlayCircle, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CodeRepoClient({ project }: { project: any }) {
    const [starred, setStarred] = useState(false);
    const [starCount, setStarCount] = useState(project.repoData?.stars || 0);
    const [watching, setWatching] = useState(false);
    const [watchCount, setWatchCount] = useState(project.repoData?.watching || 0);
    const [forked, setForked] = useState(false);
    const [forkCount, setForkCount] = useState(project.repoData?.forks || 0);

    const [activeTab, setActiveTab] = useState("Code");
    const [showClone, setShowClone] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleStar = () => {
        setStarred(!starred);
        setStarCount((prev: number) => starred ? prev - 1 : prev + 1);
    };

    const handleWatch = () => {
        setWatching(!watching);
        setWatchCount((prev: number) => watching ? prev - 1 : prev + 1);
    };

    const handleFork = () => {
        setForked(!forked);
        setForkCount((prev: number) => forked ? prev - 1 : prev + 1);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`https://starapp.ai/code/${project.slug}.git`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0d1117] text-[#c9d1d9]">

            <main className="flex-1 container mx-auto px-4 py-8 mt-16 text-sm">

                {/* Header Section */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-lg">
                        <Link href={`/projects/${project.slug}`} className="text-blue-400 hover:underline">
                            {project.title.replace(/\s+/g, '-').toLowerCase()}
                        </Link>
                        <span className="text-slate-500 mx-1">/</span>
                        <span className="font-bold text-white">{project.slug}</span>
                        <Badge variant="outline" className="ml-2 rounded-full border-slate-700 text-slate-400 px-2 py-0.5 text-xs font-normal">Public</Badge>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex rounded-md shadow-sm">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleWatch}
                                className="rounded-r-none bg-[#21262d] border-[#30363d] text-slate-300 hover:bg-[#30363d] hover:text-white h-7 gap-2"
                            >
                                <Eye className="h-3.5 w-3.5" /> {watching ? "Unwatch" : "Watch"}
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-l-none border-l-0 bg-[#21262d] border-[#30363d] text-slate-300 h-7 text-xs px-2 hover:bg-[#21262d]">
                                {watchCount}
                            </Button>
                        </div>

                        <div className="flex rounded-md shadow-sm">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleFork}
                                className="rounded-r-none bg-[#21262d] border-[#30363d] text-slate-300 hover:bg-[#30363d] hover:text-white h-7 gap-2"
                            >
                                <GitFork className="h-3.5 w-3.5" /> Fork
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-l-none border-l-0 bg-[#21262d] border-[#30363d] text-slate-300 h-7 text-xs px-2 hover:bg-[#21262d]">
                                {forkCount}
                            </Button>
                        </div>

                        <div className="flex rounded-md shadow-sm">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleStar}
                                className="rounded-r-none bg-[#21262d] border-[#30363d] text-slate-300 hover:bg-[#30363d] hover:text-white h-7 gap-2"
                            >
                                <Star className={`h-3.5 w-3.5 ${starred ? "fill-yellow-500 text-yellow-500" : ""}`} /> {starred ? "Starred" : "Star"}
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-l-none border-l-0 bg-[#21262d] border-[#30363d] text-slate-300 h-7 text-xs px-2 hover:bg-[#21262d]">
                                {starCount}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-[#30363d] mb-6 overflow-x-auto text-sm">
                    {[
                        { name: "Code", icon: FileCode },
                        { name: "Issues", icon: CircleDot, count: 12 },
                        { name: "Pull requests", icon: GitPullRequest, count: 4 },
                        { name: "Actions", icon: PlayCircle },
                        { name: "Security", icon: ShieldAlert },
                    ].map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex items-center gap-2 pb-3 px-2 border-b-2 transition-colors ${activeTab === tab.name
                                ? "border-[#f78166] text-white font-medium"
                                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
                                }`}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.name}
                            {tab.count && <span className="bg-[#30363d]/50 text-slate-300 px-1.5 py-0.5 rounded-full text-xs">{tab.count}</span>}
                        </button>
                    ))}
                </div>

                {/* Active Tab Content */}
                {activeTab === "Code" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-3 space-y-4">
                            {/* Control Bar */}
                            <div className="flex justify-between items-center bg-[#0d1117] relative z-10">
                                <Button variant="outline" size="sm" className="bg-[#21262d] border-[#30363d] text-slate-300 hover:bg-[#30363d] hover:text-white">
                                    <GitBranch className="mr-2 h-3.5 w-3.5" /> master <ChevronDown className="ml-2 h-3 w-3" />
                                </Button>

                                <div className="relative">
                                    <Button
                                        size="sm"
                                        className="bg-[#238636] hover:bg-[#2ea043] text-white border-none"
                                        onClick={() => setShowClone(!showClone)}
                                    >
                                        Code <ChevronDown className="ml-2 h-3.5 w-3.5" />
                                    </Button>

                                    {/* Clone Dropdown */}
                                    <AnimatePresence>
                                        {showClone && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 5 }}
                                                className="absolute right-0 top-full mt-2 w-80 bg-[#161b22] border border-[#30363d] rounded-md shadow-2xl z-50 p-4"
                                            >
                                                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                                                    <Download className="h-4 w-4" /> Clone
                                                </h4>
                                                <div className="text-xs text-slate-400 mb-2">HTTPS</div>
                                                <div className="flex rounded-md border border-[#30363d] bg-[#0d1117]">
                                                    <input
                                                        readOnly
                                                        value={`https://starapp.ai/code/${project.slug}.git`}
                                                        className="flex-1 bg-transparent border-none text-slate-300 text-xs px-2 py-1.5 focus:outline-none focus:ring-0"
                                                    />
                                                    <button
                                                        onClick={copyToClipboard}
                                                        className="border-l border-[#30363d] px-2 hover:bg-[#21262d] text-slate-400 hover:text-white transition-colors"
                                                    >
                                                        {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                                                    </button>
                                                </div>
                                                <div className="mt-3 text-xs text-slate-400 text-center">
                                                    Open with GitHub Desktop
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* File Browser Table */}
                            <Card className="bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden">
                                <div className="bg-[#161b22] p-3 border-b border-[#30363d] flex items-center justify-between text-xs text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[10px]">AI</div>
                                        <span className="font-semibold text-white">starapp-bot</span>
                                        <span>{project.repoData.files[0].lastCommit}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span>{project.repoData.lastUpdate}</span>
                                        <div className="flex items-center gap-1 font-semibold text-white">
                                            <History className="h-3.5 w-3.5" />
                                            <span>342 Commits</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="divide-y divide-[#30363d]">
                                    {project.repoData.files.map((file: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between p-3 hover:bg-[#161b22] transition-colors group cursor-pointer text-sm">
                                            <div className="flex items-center gap-3 w-1/3">
                                                {file.type === 'folder' ? (
                                                    <Folder className="h-4 w-4 text-[#54aeff] fill-[#54aeff]/20" />
                                                ) : (
                                                    <FileCode className="h-4 w-4 text-slate-400" />
                                                )}
                                                <span className="text-white group-hover:text-blue-400 group-hover:underline cursor-pointer">{file.name}</span>
                                            </div>
                                            <div className="flex-1 text-slate-500 truncate text-xs hover:text-blue-400 hover:underline cursor-pointer">
                                                {file.lastCommit}
                                            </div>
                                            <div className="text-slate-500 text-xs w-24 text-right">
                                                {file.time}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* README Preview */}
                            <Card className="bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden mt-8">
                                <div className="bg-[#161b22] p-2 px-4 border-b border-[#30363d] text-xs font-semibold text-white flex items-center sticky top-0">
                                    <div className="mr-2 h-3.5 w-3.5 md-icon" /> README.md
                                </div>
                                <div className="p-8 prose prose-invert prose-sm max-w-none">
                                    <h1 className="border-b border-[#30363d] pb-2">{project.title}</h1>
                                    <p>{project.description}</p>

                                    <h2>🚀 Getting Started</h2>
                                    <pre className="bg-[#161b22] p-4 rounded-md overflow-x-auto border border-[#30363d]">
                                        <code className="text-slate-300">
                                            git clone https://starapp.ai/code/{project.slug}.git<br />
                                            cd {project.slug}<br />
                                            npm install<br />
                                            npm run dev
                                        </code>
                                    </pre>

                                    <h2>🛠 Tech Stack</h2>
                                    <div className="flex gap-2 my-4">
                                        {project.tags.map((tag: string) => (
                                            <Badge key={tag} variant="secondary" className="bg-[#388bfd1a] text-[#58a6ff] hover:bg-[#388bfd26] border-none">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <h2>🤝 Contributing</h2>
                                    <p>We welcome contributions! Please fork the repository and submit a pull request.</p>
                                </div>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-6">
                            <div className="border-b border-[#30363d] pb-6">
                                <h3 className="font-semibold text-white mb-4">About</h3>
                                <p className="text-slate-400 mb-4">{project.description}</p>
                                <div className="flex items-center gap-2 text-slate-400 mb-2">
                                    <LinkIcon className="h-4 w-4" />
                                    <Link href={project.demoUrl || "#"} className="text-blue-400 hover:underline truncate" target="_blank">
                                        {project.demoUrl}
                                    </Link>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {project.tags.map((tag: string) => (
                                        <Badge key={tag} variant="outline" className="border-[#30363d] text-blue-400 bg-[#388bfd1a] hover:bg-[#388bfd26] cursor-pointer">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-white mb-2">Releases</h3>
                                <div className="flex items-center gap-2 text-slate-400 hover:text-blue-400 cursor-pointer">
                                    <GitFork className="h-4 w-4 rotate-90" /> <span className="text-white font-medium">v1.2.0</span> <Badge variant="outline" className="text-green-400 border-green-400/20 bg-green-400/10">Latest</Badge>
                                </div>
                                <div className="text-xs text-slate-500 mt-1">on Dec 18, 2024</div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-white mb-2">Contributors</h3>
                                <div className="flex -space-x-2 overflow-hidden">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0d1117] bg-indigo-500/20 flex items-center justify-center text-xs text-indigo-400 cursor-pointer hover:ring-blue-400 transition-all">
                                            U{i}
                                        </div>
                                    ))}
                                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0d1117] bg-[#21262d] flex items-center justify-center text-xs text-slate-400 cursor-pointer hover:text-white">
                                        +12
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-white mb-2">Languages</h3>
                                <div className="flex h-2 rounded-full overflow-hidden bg-[#30363d] mb-2">
                                    <div className="w-[60%]" style={{ backgroundColor: '#3178c6' }} /> {/* TS */}
                                    <div className="w-[30%]" style={{ backgroundColor: '#f1e05a' }} /> {/* JS */}
                                    <div className="w-[10%]" style={{ backgroundColor: '#563d7c' }} /> {/* CSS */}
                                </div>
                                <div className="flex flex-wrap gap-4 text-xs">
                                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3178c6' }} /> <span className="text-white font-medium">TypeScript</span> <span className="text-slate-500">60.0%</span></div>
                                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f1e05a' }} /> <span className="text-white font-medium">JavaScript</span> <span className="text-slate-500">30.0%</span></div>
                                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#563d7c' }} /> <span className="text-white font-medium">CSS</span> <span className="text-slate-500">10.0%</span></div>
                                </div>
                            </div>
                        </aside>
                    </div>
                ) : (
                    // Placeholder for other tabs
                    <div className="min-h-[400px] flex flex-col items-center justify-center border border-[#30363d] rounded-md bg-[#0d1117] p-8 text-center">
                        <div className="h-16 w-16 rounded-full bg-[#161b22] flex items-center justify-center mb-4">
                            {activeTab === "Issues" && <CircleDot className="h-8 w-8 text-slate-400" />}
                            {activeTab === "Pull requests" && <GitPullRequest className="h-8 w-8 text-slate-400" />}
                            {activeTab === "Actions" && <PlayCircle className="h-8 w-8 text-slate-400" />}
                            {activeTab === "Security" && <ShieldAlert className="h-8 w-8 text-slate-400" />}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Welcome to {activeTab}!</h3>
                        <p className="text-slate-400 max-w-md">
                            This section is currently under simulated maintenance. Please check back later for updates on {project.title}.
                        </p>
                        <Button className="mt-6 bg-[#238636] hover:bg-[#2ea043] text-white">
                            New {activeTab.slice(0, -1)}
                        </Button>
                    </div>
                )}

            </main>
        </div>
    );
}
