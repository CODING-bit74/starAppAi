"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCTA() {
    // @ts-ignore
    let cta = await prisma.cTA.findFirst();

    if (!cta) {
        // @ts-ignore
        cta = await prisma.cTA.create({
            data: {
                title: "Ready to transform your business?",
                description: "Join 500+ enterprises leveraging our AI and Blockchain infrastructure to build the future.",
                buttonText: "Get Started Now",
                buttonLink: "/pricing",
                secondaryButtonText: "Contact Us",
                secondaryButtonLink: "/contact"
            }
        });
    }

    return cta;
}

export async function updateCTA(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const buttonText = formData.get("buttonText") as string;
    const buttonLink = formData.get("buttonLink") as string;
    const secondaryButtonText = formData.get("secondaryButtonText") as string;
    const secondaryButtonLink = formData.get("secondaryButtonLink") as string;

    // @ts-ignore
    const existing = await prisma.cTA.findFirst();

    if (existing) {
        // @ts-ignore
        await prisma.cTA.update({
            where: { id: existing.id },
            data: {
                title,
                description,
                buttonText,
                buttonLink,
                secondaryButtonText,
                secondaryButtonLink
            }
        });
    } else {
        // @ts-ignore
        await prisma.cTA.create({
            data: {
                title,
                description,
                buttonText,
                buttonLink,
                secondaryButtonText,
                secondaryButtonLink
            }
        });
    }

    revalidatePath("/");
    revalidatePath("/admin/cta");
}
