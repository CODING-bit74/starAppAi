"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    category: z.string().min(1, "Category is required"),
    content: z.string().min(1, "Content is required"),
    order: z.coerce.number().default(0),
});

export async function createDoc(formData: FormData) {
    const rawData = {
        title: formData.get("title"),
        slug: formData.get("slug"),
        category: formData.get("category"),
        content: formData.get("content"),
        order: formData.get("order"),
    };

    const validatedData = FormSchema.parse(rawData);

    await prisma.doc.create({
        data: validatedData,
    });

    revalidatePath("/admin/docs");
    revalidatePath("/our-story");
    redirect("/admin/docs");
}

export async function updateDoc(id: string, formData: FormData) {
    const rawData = {
        title: formData.get("title"),
        slug: formData.get("slug"),
        category: formData.get("category"),
        content: formData.get("content"),
        order: formData.get("order"),
    };

    const validatedData = FormSchema.parse(rawData);

    await prisma.doc.update({
        where: { id },
        data: validatedData,
    });

    revalidatePath("/admin/docs");
    revalidatePath("/our-story");
    redirect("/admin/docs");
}

export async function deleteDoc(id: string) {
    await prisma.doc.delete({
        where: { id },
    });

    revalidatePath("/admin/docs");
    revalidatePath("/our-story");
}
