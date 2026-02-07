import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const documents = [
    { slug: 'privacy', title: 'Privacy Policy', description: 'Manage how user data is handled.' },
    { slug: 'terms', title: 'Terms of Service', description: 'Define rules and regulations for using the service.' },
    { slug: 'cookies', title: 'Cookie Policy', description: 'Explain how cookies are used on the site.' },
];

export default function AdminLegalPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">Legal Documents</h1>
                <p className="text-slate-400">Manage the legal content for your website. These pages are publicly accessible.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {documents.map((doc) => (
                    <Card key={doc.slug} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                        <CardHeader>
                            <div className="h-10 w-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2">
                                <FileText className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-white">{doc.title}</CardTitle>
                            <CardDescription className="text-slate-400">{doc.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-3">
                                <Badge variant="outline" className="w-fit border-indigo-500/30 text-indigo-400">
                                    /legal/{doc.slug}
                                </Badge>
                                <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 mt-2">
                                    <Link href={`/admin/legal/${doc.slug}`}>
                                        Edit Content <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
