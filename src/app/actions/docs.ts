"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createDoc(formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;

    if (!title || !slug || !content || !category) {
        throw new Error("Missing required fields");
    }

    // @ts-ignore
    await prisma.doc.create({
        data: {
            title,
            slug,
            category,
            content,
            order: 0 // Default order
        }
    });

    revalidatePath("/admin/our-story");
    revalidatePath("/our-story");
    redirect("/admin/our-story");
}

export async function updateDoc(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;

    // @ts-ignore
    await prisma.doc.update({
        where: { id },
        data: {
            title,
            slug,
            category,
            content
        }
    });

    revalidatePath("/admin/our-story");
    revalidatePath("/our-story");
    redirect("/admin/our-story");
}

export async function deleteDoc(id: string) {
    // @ts-ignore
    await prisma.doc.delete({
        where: { id }
    });

    revalidatePath("/admin/docs");
    revalidatePath("/docs");
}
