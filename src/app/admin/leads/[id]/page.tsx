import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Building, Calendar, DollarSign, FileText } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LeadDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // @ts-ignore
    const lead = await prisma.lead.findUnique({
        where: { id }
    });

    if (!lead) return notFound();

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/leads">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4 text-white" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">{lead.name}</h2>
                    <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                        <Mail className="h-4 w-4" /> {lead.email}
                        {lead.company && (
                            <>
                                <span className="mx-2">•</span>
                                <Building className="h-4 w-4" /> {lead.company}
                            </>
                        )}
                    </div>
                </div>
                <div className="ml-auto">
                    <Badge variant={lead.status === 'new' ? 'default' : 'secondary'} className={lead.status === 'new' ? 'bg-indigo-500' : 'bg-slate-700'}>
                        {lead.status}
                    </Badge>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2 bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <FileText className="h-5 w-5 text-indigo-400" />
                            Message & Requirements
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {lead.message}
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="bg-white/5 border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white text-lg">Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-400">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(lead.createdAt).toLocaleString()}</span>
                            </div>
                            <Link href={`mailto:${lead.email}`}>
                                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                    <Mail className="mr-2 h-4 w-4" /> Reply via Email
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
