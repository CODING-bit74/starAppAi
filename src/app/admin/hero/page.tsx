import { getHeroCards, createHeroCard, deleteHeroCard, updateHeroCard } from "@/app/actions/hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Trash, Save, LayoutTemplate } from "lucide-react";
// Native select doesn't need component import

export default async function AdminHeroPage() {
    const cards = await getHeroCards();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Manage Hero Cards</h1>
            <p className="text-slate-400">Add, edit, or remove the floating cards in the Hero section.</p>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Create New Card Form */}
                <Card className="bg-white/5 border-white/10 h-fit">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Plus className="h-5 w-5 text-indigo-400" />
                            Add New Card
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action={createHeroCard} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title" className="text-slate-200">Title</Label>
                                <Input
                                    id="title" name="title" required
                                    className="bg-[#0B0F19] border-white/10 text-white"
                                    placeholder="e.g. AI Analysis"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description" className="text-slate-200">Description</Label>
                                <Textarea
                                    id="description" name="description" required
                                    className="bg-[#0B0F19] border-white/10 text-white"
                                    placeholder="Short description..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="icon" className="text-slate-200">Icon</Label>
                                    <select
                                        id="icon" name="icon"
                                        className="h-10 w-full rounded-md border border-white/10 bg-[#0B0F19] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        defaultValue="Bot"
                                    >
                                        <option value="Bot">Bot</option>
                                        <option value="Database">Database</option>
                                        <option value="Globe">Globe</option>
                                        <option value="Zap">Zap</option>
                                        <option value="Shield">Shield</option>
                                        <option value="Cpu">Cpu</option>
                                        <option value="Code">Code</option>
                                        <option value="Cloud">Cloud</option>
                                        <option value="BarChart">BarChart</option>
                                    </select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="order" className="text-slate-200">Order</Label>
                                    <Input
                                        id="order" name="order" type="number" defaultValue="0"
                                        className="bg-[#0B0F19] border-white/10 text-white"
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                                Add Card
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Existing Cards List */}
                <div className="space-y-4">
                    {cards.map((card: any) => (
                        <Card key={card.id} className="bg-white/5 border-white/10">
                            <CardContent className="p-6">
                                <form action={updateHeroCard.bind(null, card.id)} className="space-y-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2 text-indigo-400">
                                            <LayoutTemplate className="h-4 w-4" />
                                            <span className="font-mono text-xs">ID: {card.id.slice(0, 8)}...</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button formAction={deleteHeroCard.bind(null, card.id)} variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Input
                                            name="title" defaultValue={card.title}
                                            className="bg-[#0B0F19] border-white/10 text-white font-semibold"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Textarea
                                            name="description" defaultValue={card.description}
                                            className="bg-[#0B0F19] border-white/10 text-slate-400 text-sm min-h-[60px]"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <select
                                            name="icon"
                                            className="h-9 w-full rounded-md border border-white/10 bg-[#0B0F19] px-3 py-1 text-sm text-white"
                                            defaultValue={card.icon}
                                        >
                                            <option value="Bot">Bot</option>
                                            <option value="Database">Database</option>
                                            <option value="Globe">Globe</option>
                                            <option value="Zap">Zap</option>
                                            <option value="Shield">Shield</option>
                                            <option value="Cpu">Cpu</option>
                                            <option value="Code">Code</option>
                                            <option value="Cloud">Cloud</option>
                                            <option value="BarChart">BarChart</option>
                                        </select>
                                        <Input
                                            name="order" type="number" defaultValue={card.order}
                                            className="bg-[#0B0F19] border-white/10 text-white h-9"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit" size="sm" variant="outline" className="text-xs border-indigo-500/30 hover:bg-indigo-500/10">
                                            <Save className="h-3 w-3 mr-1" /> Update
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
