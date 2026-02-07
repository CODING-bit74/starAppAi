"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getSolutions() {
    // @ts-ignore
    return await prisma.solution.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function getSolution(id: string) {
    // @ts-ignore
    return await prisma.solution.findUnique({
        where: { id }
    });
}

export async function getSolutionBySlug(slug: string) {
    // @ts-ignore
    return await prisma.solution.findUnique({
        where: { slug }
    });
}

export async function createSolution(formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const icon = formData.get("icon") as string;
    const features = formData.get("features") as string; // JSON string
    const order = parseInt(formData.get("order") as string || "0");

    // @ts-ignore
    await prisma.solution.create({
        data: {
            title,
            slug,
            description,
            content,
            icon,
            features,
            order
        }
    });

    revalidatePath("/solutions");
    revalidatePath("/admin/solutions");
    redirect("/admin/solutions");
}

export async function updateSolution(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const icon = formData.get("icon") as string;
    const features = formData.get("features") as string; // JSON string
    const order = parseInt(formData.get("order") as string || "0");

    // @ts-ignore
    await prisma.solution.update({
        where: { id },
        data: {
            title,
            slug,
            description,
            content,
            icon,
            features,
            order
        }
    });

    revalidatePath("/solutions");
    revalidatePath(`/solutions/${slug}`);
    revalidatePath("/admin/solutions");
    redirect("/admin/solutions");
}

export async function deleteSolution(id: string) {
    try {
        // @ts-ignore
        await prisma.solution.delete({
            where: { id }
        });
        revalidatePath("/admin/solutions");
        revalidatePath("/solutions");
    } catch (error) {
        console.error("Failed to delete solution:", error);
    }
}
