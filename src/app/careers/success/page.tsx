import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ApplicationSuccessPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#0B0F19]">
            <Navbar />
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="text-center space-y-6 max-w-md">
                    <div className="mx-auto h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Application Received!</h1>
                    <p className="text-slate-400">
                        Thank you for applying. Our team will review your application and get back to you soon.
                    </p>
                    <Link href="/careers">
                        <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                            Back to Careers
                        </Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
