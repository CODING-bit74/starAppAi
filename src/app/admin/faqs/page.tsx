import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, HelpCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteFaq } from "@/app/actions/faqs";

export default async function AdminFaqsPage() {
    const faqs = await prisma.faq.findMany({
        orderBy: { order: 'asc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Frequently Asked Questions</h2>
                    <p className="text-slate-400">Manage the Q&A section of your website.</p>
                </div>
                <Link href="/admin/faqs/new">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                        <Plus className="mr-2 h-4 w-4" />
                        New FAQ
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border border-white/10 bg-white/5">
                <div className="p-4">
                    {faqs.length === 0 ? (
                        <div className="text-center py-10 text-slate-500">
                            <HelpCircle className="h-10 w-10 mx-auto mb-3 opacity-50" />
                            <p>No FAQs found. Create one to get started.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {faqs.map((faq) => (
                                <div
                                    key={faq.id}
                                    className="flex items-start justify-between p-4 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <div className="space-y-2 max-w-3xl">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-white text-lg">{faq.question}</span>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20">
                                                Order: {faq.order}
                                            </span>
                                        </div>
                                        <p className="text-slate-400 text-sm whitespace-pre-wrap">{faq.answer}</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <Link href={`/admin/faqs/${faq.id}/edit`}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <form action={deleteFaq.bind(null, faq.id)}>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
