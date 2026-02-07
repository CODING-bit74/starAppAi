import { prisma } from "@/lib/prisma"
import type { Lead } from "@prisma/client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { LeadActions } from "@/components/admin/LeadActions"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link";

export default async function LeadsPage() {
    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
                    <p className="text-muted-foreground">Manage incoming contact requests.</p>
                </div>
            </div>

            <div className="border border-white/10 rounded-md bg-[#0d1117]">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/10 hover:bg-white/5">
                            <TableHead className="text-slate-400">Name</TableHead>
                            <TableHead className="text-slate-400">Email</TableHead>
                            <TableHead className="text-slate-400">Company</TableHead>
                            <TableHead className="text-slate-400">Date</TableHead>
                            <TableHead className="text-right text-slate-400">Status & Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leads.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                                    No leads found.
                                </TableCell>
                            </TableRow>
                        )}
                        {leads.map((lead: Lead) => (
                            <TableRow key={lead.id} className="border-white/10 hover:bg-white/5">
                                <TableCell className="font-medium text-white">{lead.name}</TableCell>
                                <TableCell className="text-slate-400">{lead.email}</TableCell>
                                <TableCell className="text-slate-400">{lead.company || "-"}</TableCell>
                                <TableCell className="text-slate-400">
                                    {new Date(lead.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/leads/${lead.id}`}>
                                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white h-8 w-8">
                                                <Mail className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <LeadActions id={lead.id} currentStatus={lead.status} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
