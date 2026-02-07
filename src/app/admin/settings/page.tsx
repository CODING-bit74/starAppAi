import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { updateContactInfo } from "@/app/actions/admin";
import { prisma } from "@/lib/prisma";

export default async function AdminSettingsPage() {
    // @ts-ignore
    const info = await prisma.contactInfo.findFirst();

    const email = info?.email || "contact@starapp.ai";
    const phone = info?.phone || "+1 (555) 123-4567";
    const address = info?.address || "123 Innovation Drive, Tech City, TC 94000";

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">General Settings</h2>
                <p className="text-muted-foreground">Manage your global site configuration.</p>
            </div>

            <Card className="bg-white/5 border-white/10 max-w-2xl">
                <form action={updateContactInfo}>
                    <CardHeader>
                        <CardTitle className="text-white">Contact Information</CardTitle>
                        <CardDescription>displayed on the Contact page and Footer.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-200">Public Email</Label>
                            <Input id="email" name="email" defaultValue={email} className="bg-white/5 border-white/10 text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-slate-200">Phone Number</Label>
                            <Input id="phone" name="phone" defaultValue={phone} className="bg-white/5 border-white/10 text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-slate-200">Business Address</Label>
                            <Input id="address" name="address" defaultValue={address} className="bg-white/5 border-white/10 text-white" />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t border-white/5 pt-4 flex justify-end">
                        <Button type="submit" variant="premium" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            Save Changes
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
