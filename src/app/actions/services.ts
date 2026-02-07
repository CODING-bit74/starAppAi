"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getServices() {
    // @ts-ignore
    return await prisma.service.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function getService(id: string) {
    // @ts-ignore
    return await prisma.service.findUnique({
        where: { id }
    });
}

export async function createService(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const color = formData.get("color") as string;
    const order = parseInt(formData.get("order") as string || "0");

    // @ts-ignore
    await prisma.service.create({
        data: {
            title,
            description,
            icon,
            color,
            order
        }
    });

    revalidatePath("/");
    revalidatePath("/admin/services");
    redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const color = formData.get("color") as string;
    const order = parseInt(formData.get("order") as string || "0");

    // @ts-ignore
    await prisma.service.update({
        where: { id },
        data: {
            title,
            description,
            icon,
            color,
            order
        }
    });

    revalidatePath("/");
    revalidatePath("/admin/services");
    redirect("/admin/services");
}

export async function deleteService(id: string) {
    try {
        // @ts-ignore
        await prisma.service.delete({
            where: { id }
        });
        revalidatePath("/admin/services");
        revalidatePath("/");
    } catch (error) {
        console.error("Failed to delete service:", error);
    }
}
