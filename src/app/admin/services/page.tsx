import { getServices, deleteService } from "@/app/actions/services";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, GripVertical, Brain, Link as LinkIcon, Shield, Zap, BarChart, Globe } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Icon map for display
const iconMap: any = {
    Brain, Link: LinkIcon, Shield, Zap, BarChart, Globe
};

export default async function AdminServicesPage() {
    const services = await getServices();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Services</h1>
                <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                    <Link href="/admin/services/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Service
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {services.map((service: any) => {
                    const Icon = iconMap[service.icon] || Zap;
                    return (
                        <Card key={service.id} className="bg-white/5 border-white/10">
                            <CardContent className="flex items-center p-6 gap-6">
                                <div className="cursor-grab text-slate-500 hover:text-white">
                                    <GripVertical className="h-5 w-5" />
                                </div>

                                <div className={`p-3 rounded-lg bg-white/5 ${service.color}`}>
                                    <Icon className="h-6 w-6" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                                    <p className="text-slate-400">{service.description}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button asChild variant="ghost" size="icon" className="hover:bg-white/10">
                                        <Link href={`/admin/services/${service.id}`}>
                                            <Pencil className="h-4 w-4 text-slate-400" />
                                        </Link>
                                    </Button>

                                    <form action={deleteService.bind(null, service.id)}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-red-500/10 hover:text-red-500"
                                            type="submit"
                                        >
                                            <Trash2 className="h-4 w-4 text-slate-400" />
                                        </Button>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}

                {services.length === 0 && (
                    <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10 border-dashed">
                        <p className="text-slate-400">No services found. Create one to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
