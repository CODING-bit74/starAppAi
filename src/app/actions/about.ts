"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAboutInfo() {
    // @ts-ignore
    let info = await prisma.aboutInfo.findFirst();

    if (!info) {
        // Initialize with default values if not exists
        // @ts-ignore
        info = await prisma.aboutInfo.create({
            data: {
                title: "About StarApp.AI",
                description: "Founded in 2024, StarApp.AI is on a mission to democratize autonomous agent technology for the enterprise. We believe that the future of work is collaborative—between humans and intelligent agents.",
                stat1Value: "15+",
                stat1Label: "Countries Served",
                stat2Value: "98%",
                stat2Label: "Client Retention",
                stat3Value: "24/7",
                stat3Label: "Global Support",
                twitterUrl: "",
                githubUrl: "",
                linkedinUrl: ""
            }
        });
    }

    return info;
}

export async function updateAboutInfo(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const stat1Value = formData.get("stat1Value") as string;
    const stat1Label = formData.get("stat1Label") as string;

    const stat2Value = formData.get("stat2Value") as string;
    const stat2Label = formData.get("stat2Label") as string;

    const stat3Value = formData.get("stat3Value") as string;
    const stat3Label = formData.get("stat3Label") as string;

    const twitterUrl = formData.get("twitterUrl") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string;

    // @ts-ignore
    const existing = await prisma.aboutInfo.findFirst();

    if (existing) {
        // @ts-ignore
        await prisma.aboutInfo.update({
            where: { id: existing.id },
            data: {
                title,
                description,
                stat1Value,
                stat1Label,
                stat2Value,
                stat2Label,
                stat3Value,
                stat3Label,
                twitterUrl,
                githubUrl,
                linkedinUrl
            }
        });
    } else {
        // @ts-ignore
        await prisma.aboutInfo.create({
            data: {
                title,
                description,
                stat1Value,
                stat1Label,
                stat2Value,
                stat2Label,
                stat3Value,
                stat3Label,
                twitterUrl,
                githubUrl,
                linkedinUrl
            }
        });
    }

    revalidatePath("/");
    revalidatePath("/admin/about");
}
