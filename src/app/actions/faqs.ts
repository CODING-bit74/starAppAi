"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
    question: z.string().min(1, "Question is required"),
    answer: z.string().min(1, "Answer is required"),
    order: z.coerce.number().default(0),
});

export async function createFaq(formData: FormData) {
    const rawData = {
        question: formData.get("question"),
        answer: formData.get("answer"),
        order: formData.get("order"),
    };

    const validatedData = FormSchema.parse(rawData);

    await prisma.faq.create({
        data: validatedData,
    });

    revalidatePath("/admin/faqs");
    redirect("/admin/faqs");
}

export async function updateFaq(id: string, formData: FormData) {
    const rawData = {
        question: formData.get("question"),
        answer: formData.get("answer"),
        order: formData.get("order"),
    };

    const validatedData = FormSchema.parse(rawData);

    await prisma.faq.update({
        where: { id },
        data: validatedData,
    });

    revalidatePath("/admin/faqs");
    redirect("/admin/faqs");
}

export async function deleteFaq(id: string) {
    await prisma.faq.delete({
        where: { id },
    });

    revalidatePath("/admin/faqs");
}
