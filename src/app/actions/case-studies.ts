"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getCaseStudies() {
    // @ts-ignore
    return await prisma.caseStudy.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function getCaseStudy(id: string) {
    // @ts-ignore
    return await prisma.caseStudy.findUnique({
        where: { id }
    });
}

export async function getCaseStudyBySlug(slug: string) {
    // @ts-ignore
    return await prisma.caseStudy.findUnique({
        where: { slug }
    });
}

export async function createCaseStudy(formData: FormData) {
    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const result = formData.get("result") as string;
    const metric = formData.get("metric") as string;

    // @ts-ignore
    await prisma.caseStudy.create({
        data: {
            title,
            company,
            slug,
            description,
            content,
            result,
            metric
        }
    });

    revalidatePath("/");
    revalidatePath("/admin/case-studies");
    redirect("/admin/case-studies");
}

export async function updateCaseStudy(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const result = formData.get("result") as string;
    const metric = formData.get("metric") as string;

    // @ts-ignore
    await prisma.caseStudy.update({
        where: { id },
        data: {
            title,
            company,
            slug,
            description,
            content,
            result,
            metric
        }
    });

    revalidatePath("/");
    revalidatePath("/admin/case-studies");
    redirect("/admin/case-studies");
}

export async function deleteCaseStudy(id: string) {
    // @ts-ignore
    await prisma.caseStudy.delete({
        where: { id }
    });
    revalidatePath("/admin/case-studies");
}
