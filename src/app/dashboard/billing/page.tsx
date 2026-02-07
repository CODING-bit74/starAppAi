"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Download, Zap } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const invoices = [
    { id: "INV-001", date: "Dec 01, 2024", amount: "$49.00", status: "Paid" },
    { id: "INV-002", date: "Nov 01, 2024", amount: "$49.00", status: "Paid" },
    { id: "INV-003", date: "Oct 01, 2024", amount: "$49.00", status: "Paid" },
];

export default function BillingPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Billing</h2>
                <p className="text-muted-foreground">Manage your subscription and payment methods.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Current Plan */}
                <Card className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-500/30">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-white">Pro Plan</CardTitle>
                                <CardDescription className="text-indigo-200">Billed monthly</CardDescription>
                            </div>
                            <Badge className="bg-indigo-500 text-white hover:bg-indigo-600">Active</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white mb-6">
                            $49<span className="text-lg text-indigo-200 font-normal">/month</span>
                        </div>
                        <ul className="space-y-3">
                            {["Unlimited AI Agents", "Advanced Analytics", "Priority Support", "Custom Integrations"].map((feature, i) => (
                                <li key={i} className="flex items-center text-sm text-indigo-100">
                                    <Check className="h-4 w-4 mr-2 text-indigo-400" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">Upgrade Plan <Zap className="ml-2 h-4 w-4" /></Button>
                    </CardFooter>
                </Card>

                {/* Payment Method */}
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Payment Method</CardTitle>
                        <CardDescription>Manage your payment details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 p-4 border border-white/10 rounded-lg bg-white/5">
                            <div className="h-10 w-16 bg-slate-700 rounded flex items-center justify-center text-white font-bold">
                                VISA
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-white">Visa ending in 4242</p>
                                <p className="text-xs text-slate-400">Expires 12/28</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">Edit</Button>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5">
                            <CreditCard className="mr-2 h-4 w-4" /> Add Payment Method
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Invoices */}
            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/10 hover:bg-white/5">
                                <TableHead className="text-slate-400">Invoice</TableHead>
                                <TableHead className="text-slate-400">Date</TableHead>
                                <TableHead className="text-slate-400">Amount</TableHead>
                                <TableHead className="text-slate-400">Status</TableHead>
                                <TableHead className="text-right text-slate-400">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.id} className="border-white/10 hover:bg-white/5">
                                    <TableCell className="font-medium text-white">{invoice.id}</TableCell>
                                    <TableCell className="text-slate-300">{invoice.date}</TableCell>
                                    <TableCell className="text-slate-300">{invoice.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-green-500/10 text-green-400 hover:bg-green-500/20">
                                            {invoice.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
