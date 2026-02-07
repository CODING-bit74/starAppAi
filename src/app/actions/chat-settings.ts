"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getKnowledgeBase() {
    try {
        // @ts-ignore
        const knowledge = await prisma.botKnowledge.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        return knowledge;
    } catch (error) {
        console.error("Error fetching knowledge base:", error);
        return [];
    }
}

export async function getActiveKnowledge() {
    try {
        // @ts-ignore
        const knowledge = await prisma.botKnowledge.findMany({
            where: { active: true },
            select: { topic: true, content: true }
        });
        return knowledge;
    } catch (error) {
        console.error("Error fetching active knowledge:", error);
        return [];
    }
}

export async function createKnowledge(data: { topic: string; content: string; keywords: string }) {
    try {
        // @ts-ignore
        await prisma.botKnowledge.create({
            data: {
                topic: data.topic,
                content: data.content,
                keywords: data.keywords,
                active: true
            }
        });
        revalidatePath("/admin/chat");
        return { success: true };
    } catch (error) {
        console.error("Error creating knowledge:", error);
        return { success: false, error: "Failed to create entry" };
    }
}

// Suggestions

export async function getSuggestions() {
    try {
        // @ts-ignore
        const suggestions = await prisma.botSuggestion.findMany({
            orderBy: {
                order: "asc"
            }
        });
        return suggestions;
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        return [];
    }
}

export async function getActiveSuggestions() {
    try {
        // @ts-ignore
        const suggestions = await prisma.botSuggestion.findMany({
            where: { active: true },
            orderBy: { order: "asc" },
            take: 4 // Limit to 4 for UI design
        });
        return suggestions;
    } catch (error) {
        console.error("Error fetching active suggestions:", error);
        return [];
    }
}

export async function createSuggestion(text: string) {
    try {
        // @ts-ignore
        await prisma.botSuggestion.create({
            data: {
                text,
                active: true,
                order: 0
            }
        });
        revalidatePath("/admin/chat");
        return { success: true };
    } catch (error) {
        console.error("Error creating suggestion:", error);
        return { success: false, error: "Failed to create suggestion" };
    }
}

export async function deleteSuggestion(id: string) {
    try {
        // @ts-ignore
        await prisma.botSuggestion.delete({
            where: { id }
        });
        revalidatePath("/admin/chat");
        return { success: true };
    } catch (error) {
        console.error("Error deleting suggestion:", error);
        return { success: false, error: "Failed to delete suggestion" };
    }
}

export async function updateSuggestionOrder(id: string, newOrder: number) {
    // Simplified logic: just update the single item for now
    try {
        // @ts-ignore
        await prisma.botSuggestion.update({
            where: { id },
            data: { order: newOrder }
        });
        revalidatePath("/admin/chat");
        return { success: true };
    } catch (error) {
        console.error("Error updating suggestion:", error);
        return { success: false, error: "Failed to update suggestion" };
    }
}

export async function updateKnowledge(id: string, data: { topic: string; content: string; keywords: string; active: boolean }) {
    try {
        // @ts-ignore
        await prisma.botKnowledge.update({
            where: { id },
            data: {
                topic: data.topic,
                content: data.content,
                keywords: data.keywords,
                active: data.active
            }
        });
        revalidatePath("/admin/chat");
        return { success: true };
    } catch (error) {
        console.error("Error updating knowledge:", error);
        return { success: false, error: "Failed to update entry" };
    }
}

export async function deleteKnowledge(id: string) {
    try {
        // @ts-ignore
        await prisma.botKnowledge.delete({
            where: { id }
        });
        revalidatePath("/admin/chat");
        return { success: true };
    } catch (error) {
        console.error("Error deleting knowledge:", error);
        return { success: false, error: "Failed to delete entry" };
    }
}
