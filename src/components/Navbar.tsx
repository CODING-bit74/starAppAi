"use client";
// import { useSession, signOut } from "next-auth/react"; // Removed
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, Menu } from "lucide-react";
import Image from "next/image";

export function Navbar() {


    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#020617]/80 backdrop-blur-xl">
            <div className="container mx-auto flex h-20 items-center justify-between px-4">


                <Link href="/" className="flex items-center gap-2">
                    <div className="relative h-35 w-48 transition-opacity hover:opacity-90">
                        <Image
                            src="/Company_LOGO_Dark-BG.png"
                            alt="StarApp.AI Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>
                <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
                    <Link href="/" className="hover:text-amber-400 transition-colors">
                        Home
                    </Link>
                    <Link href="/#features" className="hover:text-amber-400 transition-colors">
                        Features
                    </Link>
                    <Link href="/solutions" className="hover:text-amber-400 transition-colors">
                        Solutions
                    </Link>
                    <Link href="/pricing" className="hover:text-amber-400 transition-colors">
                        Pricing
                    </Link>
                    <Link href="/#about" className="hover:text-amber-400 transition-colors">
                        About
                    </Link>
                </nav>
                <div className="flex items-center gap-4">

                    <Link href="/pricing" passHref>
                        <Button variant="premium">
                            Get Started
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
