"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSystemStats() {
    // 1. Fetch the stored/manual config
    // @ts-ignore
    let stats = await prisma.systemStats.findFirst();

    // If no stats exist, create default
    if (!stats) {
        // @ts-ignore
        stats = await prisma.systemStats.create({
            data: {
                activeUsers: "0",
                transactionsProcessed: "0",
                aiPredictions: "10M+",
                uptimeGuarantee: "99.9%",
                countriesServed: "150+",
                clientRetention: "98%",
                globalSupport: "24/7"
            }
        });
    }

    // 2. Fetch REAL data counts - DISABLED per user request (Manual Override)
    // const userCount = await prisma.user.count();
    // const orderCount = await prisma.order.count();

    return stats;
}

export async function updateSystemStats(formData: FormData) {
    // @ts-ignore
    const stats = await prisma.systemStats.findFirst();

    if (!stats) {
        // Should not happen if getSystemStats is called first, but handle just in case
        // @ts-ignore
        await prisma.systemStats.create({
            data: {
                activeUsers: formData.get("activeUsers") as string,
                transactionsProcessed: formData.get("transactionsProcessed") as string,
                aiPredictions: formData.get("aiPredictions") as string,
                uptimeGuarantee: formData.get("uptimeGuarantee") as string,
                countriesServed: formData.get("countriesServed") as string,
                clientRetention: formData.get("clientRetention") as string,
                globalSupport: formData.get("globalSupport") as string
            }
        });
    } else {
        // @ts-ignore
        await prisma.systemStats.update({
            where: { id: stats.id },
            data: {
                activeUsers: formData.get("activeUsers") as string,
                transactionsProcessed: formData.get("transactionsProcessed") as string,
                aiPredictions: formData.get("aiPredictions") as string,
                uptimeGuarantee: formData.get("uptimeGuarantee") as string,
                countriesServed: formData.get("countriesServed") as string,
                clientRetention: formData.get("clientRetention") as string,
                globalSupport: formData.get("globalSupport") as string
            }
        });
    }

    revalidatePath("/");
    revalidatePath("/admin/stats");
}
