import { getCTA, updateCTA } from "@/app/actions/cta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Save, Megaphone } from "lucide-react";

export default async function AdminCTAPage() {
    const cta = await getCTA();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Manage CTA Section</h1>

            <form action={updateCTA} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main Content Card */}
                <Card className="bg-white/5 border-white/10 lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Megaphone className="h-5 w-5 text-indigo-400" />
                            Main Content
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            Update the heading and description of the Call to Action section.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="text-slate-200">Headline</Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={cta.title}
                                className="bg-[#0B0F19] border-white/10 text-white focus:border-indigo-500"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description" className="text-slate-200">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={cta.description}
                                className="bg-[#0B0F19] border-white/10 text-white min-h-[100px] focus:border-indigo-500"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Primary Button */}
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Primary Button</CardTitle>
                        <CardDescription className="text-slate-400">
                            The main action button (Premium style).
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="buttonText" className="text-slate-200">Button Text</Label>
                            <Input
                                id="buttonText" name="buttonText"
                                defaultValue={cta.buttonText}
                                className="bg-[#0B0F19] border-white/10 text-white"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="buttonLink" className="text-slate-200">Button Link</Label>
                            <Input
                                id="buttonLink" name="buttonLink"
                                defaultValue={cta.buttonLink}
                                className="bg-[#0B0F19] border-white/10 text-white"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Secondary Button */}
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Secondary Button</CardTitle>
                        <CardDescription className="text-slate-400">
                            The secondary action button (Outline style).
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="secondaryButtonText" className="text-slate-200">Button Text</Label>
                            <Input
                                id="secondaryButtonText" name="secondaryButtonText"
                                defaultValue={cta.secondaryButtonText}
                                className="bg-[#0B0F19] border-white/10 text-white"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="secondaryButtonLink" className="text-slate-200">Button Link</Label>
                            <Input
                                id="secondaryButtonLink" name="secondaryButtonLink"
                                defaultValue={cta.secondaryButtonLink}
                                className="bg-[#0B0F19] border-white/10 text-white"
                            />
                        </div>
                    </CardContent>
                </Card>


                <div className="lg:col-span-2 flex justify-end">
                    <Button type="submit" size="lg" className="bg-indigo-600 hover:bg-indigo-700 min-w-[200px]">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
}
