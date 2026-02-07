"use client";

import { Button } from "@/components/ui/button";
import { Share2, Check, Linkedin, Twitter, Instagram, Link2 } from "lucide-react";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ShareButton({ title }: { title?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: any) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareToSocial = (platform: "linkedin" | "twitter" | "facebook") => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(title || "Check this out!");

        let shareUrl = "";

        switch (platform) {
            case "linkedin":
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                break;
            // Instagram doesn't have a direct web share API for posts like this usually, 
            // but we can just copy link or open instagram. 
            // For now, let's omit Instagram direct share as it's not standard via URL 
            // and instead focus on Copy Link for IG. 
            // Or we can just just link to instagram.com. 
            // Let's stick to Linkdin, X, and Copy for now as they work best on web.
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-white transition-colors"
                    title="Share this post"
                >
                    <Share2 className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#0B0F19] border-white/10 text-white">
                <DropdownMenuLabel>Share to</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuItem
                    className="cursor-pointer hover:bg-white/5 focus:bg-white/5"
                    onClick={() => shareToSocial("linkedin")}
                >
                    <Linkedin className="mr-2 h-4 w-4 text-blue-500" />
                    <span>LinkedIn</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="cursor-pointer hover:bg-white/5 focus:bg-white/5"
                    onClick={() => shareToSocial("twitter")}
                >
                    <Twitter className="mr-2 h-4 w-4 text-sky-500" />
                    <span>X.com</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuItem
                    className="cursor-pointer hover:bg-white/5 focus:bg-white/5"
                    onSelect={handleCopy}
                >
                    {copied ? (
                        <Check className="mr-2 h-4 w-4 text-green-400" />
                    ) : (
                        <Link2 className="mr-2 h-4 w-4 text-slate-400" />
                    )}
                    <span>{copied ? "Copied!" : "Copy Link"}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
