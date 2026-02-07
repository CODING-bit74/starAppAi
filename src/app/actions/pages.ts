"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPageContent(key: string) {
    // @ts-ignore
    let content = await prisma.pageContent.findUnique({
        where: { key }
    });

    if (!content) {
        // Defaults based on key
        let defaultData = {
            title: "Header Title",
            subtitle: "Subtitle",
            description: "Description"
        };

        if (key === "solutions_header") {
            defaultData = {
                title: "Tailored for your Industry",
                subtitle: "Enterprise Solutions",
                description: "Discover how our autonomous agents and blockchain infrastructure can act as a force multiplier for your specific business needs."
            };
        }

        // @ts-ignore
        content = await prisma.pageContent.create({
            data: {
                key,
                ...defaultData
            }
        });
    }

    return content;
}

export async function updatePageContent(key: string, formData: FormData) {
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;

    // @ts-ignore
    await prisma.pageContent.upsert({
        where: { key },
        update: {
            title,
            subtitle,
            description
        },
        create: {
            key,
            title,
            subtitle,
            description
        }
    });

    revalidatePath("/solutions");
    revalidatePath("/admin/solutions");
}
