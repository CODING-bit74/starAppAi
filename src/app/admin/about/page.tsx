import { getAboutInfo, updateAboutInfo } from "@/app/actions/about";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Save, Info } from "lucide-react";

export default async function AdminAboutPage() {
    const info = await getAboutInfo();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Manage About Section</h1>

            <form action={updateAboutInfo} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main Content Card */}
                <Card className="bg-white/5 border-white/10 lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Info className="h-5 w-5 text-indigo-400" />
                            Main Content
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            Update the main heading and description of the About section.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="text-slate-200">Section Title</Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={info.title}
                                className="bg-[#0B0F19] border-white/10 text-white focus:border-indigo-500"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description" className="text-slate-200">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={info.description}
                                className="bg-[#0B0F19] border-white/10 text-white min-h-[150px] focus:border-indigo-500"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Statistics Cards */}
                <Card className="bg-white/5 border-white/10 lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-white">Key Statistics</CardTitle>
                        <CardDescription className="text-slate-400">
                            Customize the three key metrics displayed in the About section.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-3">
                        {/* Stat 1 */}
                        <div className="space-y-4 p-4 rounded-lg bg-[#0B0F19] border border-white/5">
                            <h3 className="font-semibold text-indigo-400">Statistic 1</h3>
                            <div className="grid gap-2">
                                <Label htmlFor="stat1Value">Value</Label>
                                <Input
                                    id="stat1Value" name="stat1Value"
                                    defaultValue={info.stat1Value}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="stat1Label">Label</Label>
                                <Input
                                    id="stat1Label" name="stat1Label"
                                    defaultValue={info.stat1Label}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                        </div>

                        {/* Stat 2 */}
                        <div className="space-y-4 p-4 rounded-lg bg-[#0B0F19] border border-white/5">
                            <h3 className="font-semibold text-cyan-400">Statistic 2</h3>
                            <div className="grid gap-2">
                                <Label htmlFor="stat2Value">Value</Label>
                                <Input
                                    id="stat2Value" name="stat2Value"
                                    defaultValue={info.stat2Value}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="stat2Label">Label</Label>
                                <Input
                                    id="stat2Label" name="stat2Label"
                                    defaultValue={info.stat2Label}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                        </div>

                        {/* Stat 3 */}
                        <div className="space-y-4 p-4 rounded-lg bg-[#0B0F19] border border-white/5">
                            <h3 className="font-semibold text-purple-400">Statistic 3</h3>
                            <div className="grid gap-2">
                                <Label htmlFor="stat3Value">Value</Label>
                                <Input
                                    id="stat3Value" name="stat3Value"
                                    defaultValue={info.stat3Value}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="stat3Label">Label</Label>
                                <Input
                                    id="stat3Label" name="stat3Label"
                                    defaultValue={info.stat3Label}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Social Media Links */}
                <Card className="bg-white/5 border-white/10 lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-white">Social Media Links</CardTitle>
                        <CardDescription className="text-slate-400">
                            Manage the social links displayed in the footer.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="twitterUrl" className="text-slate-200">Twitter URL</Label>
                            <Input
                                id="twitterUrl" name="twitterUrl"
                                defaultValue={info.twitterUrl || ""}
                                placeholder="https://twitter.com/..."
                                className="bg-[#0B0F19] border-white/10 text-white focus:border-indigo-500"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="githubUrl" className="text-slate-200">GitHub URL</Label>
                            <Input
                                id="githubUrl" name="githubUrl"
                                defaultValue={info.githubUrl || ""}
                                placeholder="https://github.com/..."
                                className="bg-[#0B0F19] border-white/10 text-white focus:border-indigo-500"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="linkedinUrl" className="text-slate-200">LinkedIn URL</Label>
                            <Input
                                id="linkedinUrl" name="linkedinUrl"
                                defaultValue={info.linkedinUrl || ""}
                                placeholder="https://linkedin.com/in/..."
                                className="bg-[#0B0F19] border-white/10 text-white focus:border-indigo-500"
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
