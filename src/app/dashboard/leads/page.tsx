import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function LeadsPage() {
    // Fetch leads from DB
    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Leads</h2>
                    <p className="text-muted-foreground">Manage and track your potential customers.</p>
                </div>
                <Button variant="premium" className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 outline-none border-none">
                    <Plus className="mr-2 h-4 w-4" /> Add New Lead
                </Button>
            </div>

            <Card className="bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                    <CardTitle className="text-white">All Leads</CardTitle>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search leads..." className="pl-8 w-[200px] bg-white/5 border-white/10 text-white" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {leads.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                            <p className="text-lg mb-4">No leads found.</p>
                            <p className="text-sm">Start by adding a new lead manually or integrating a form.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/10 hover:bg-white/5">
                                    <TableHead className="text-slate-400">Name</TableHead>
                                    <TableHead className="text-slate-400">Company</TableHead>
                                    <TableHead className="text-slate-400">Email</TableHead>
                                    <TableHead className="text-slate-400">Status</TableHead>
                                    <TableHead className="text-slate-400 text-right">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leads.map((lead) => (
                                    <TableRow key={lead.id} className="border-white/10 hover:bg-white/5">
                                        <TableCell className="font-medium text-white">{lead.name}</TableCell>
                                        <TableCell className="text-slate-300">{lead.company || "-"}</TableCell>
                                        <TableCell className="text-slate-300">{lead.email}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`
                                                ${lead.status === 'new' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                                                ${lead.status === 'contacted' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : ''}
                                                ${lead.status === 'closed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                                            `}>
                                                {lead.status.toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right text-slate-400">
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
