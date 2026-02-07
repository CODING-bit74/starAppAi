"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getLegalDoc(slug: string) {
    // @ts-ignore
    return await prisma.legalDoc.findUnique({
        where: { slug }
    });
}

export async function getLegalDocs() {
    // @ts-ignore
    return await prisma.legalDoc.findMany({
        orderBy: { title: 'asc' }
    });
}

export async function updateLegalDoc(slug: string, content: string) {
    // Upsert: Create if not exists, update if exists
    // @ts-ignore
    await prisma.legalDoc.upsert({
        where: { slug },
        update: {
            content,
            updatedAt: new Date()
        },
        create: {
            title: getTitleFromSlug(slug),
            slug,
            content,
            updatedAt: new Date()
        }
    });

    revalidatePath(`/legal/${slug}`);
    revalidatePath("/admin/legal");
}

function getTitleFromSlug(slug: string) {
    switch (slug) {
        case 'privacy': return 'Privacy Policy';
        case 'terms': return 'Terms of Service';
        case 'cookies': return 'Cookie Policy';
        default: return slug;
    }
}
