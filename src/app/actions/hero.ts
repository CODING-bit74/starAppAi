"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getHeroCards() {
    // @ts-ignore
    const count = await prisma.heroCard.count();

    if (count === 0) {
        // Seed initial cards
        // @ts-ignore
        await prisma.heroCard.createMany({
            data: [
                {
                    title: "Advanced AI Agents",
                    description: "Autonomous agents that learn and adapt to your workflows.",
                    icon: "Bot",
                    order: 0
                },
                {
                    title: "RAG Knowledge Base",
                    description: "Connect your data sources for context-aware intelligence.",
                    icon: "Database",
                    order: 1
                },
                {
                    title: "Global Blockchain",
                    description: "Decentralized verification and secure transaction layer.",
                    icon: "Globe",
                    order: 2
                }
            ]
        });
    }

    // @ts-ignore
    return await prisma.heroCard.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function createHeroCard(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const order = parseInt(formData.get("order") as string || "0");

    // @ts-ignore
    await prisma.heroCard.create({
        data: {
            title,
            description,
            icon,
            order
        }
    });

    revalidatePath("/");
    revalidatePath("/admin/hero");
}

export async function updateHeroCard(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const order = parseInt(formData.get("order") as string || "0");

    // @ts-ignore
    await prisma.heroCard.update({
        where: { id },
        data: {
            title,
            description,
            icon,
            order
        }
    });

    revalidatePath("/");
    revalidatePath("/admin/hero");
}

export async function deleteHeroCard(id: string) {
    // @ts-ignore
    await prisma.heroCard.delete({
        where: { id }
    });

    revalidatePath("/");
    revalidatePath("/admin/hero");
}
