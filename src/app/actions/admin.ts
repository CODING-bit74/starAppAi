"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const demoUrl = formData.get("demoUrl") as string;
    const repoUrl = formData.get("repoUrl") as string;
    const tags = formData.get("tags") as string || "[]";
    const demoConfig = formData.get("demoConfig") as string;
    const repoData = formData.get("repoData") as string;

    // Generate simple slug
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    await prisma.project.create({
        data: {
            title,
            slug,
            description,
            content,
            category,
            demoUrl,
            repoUrl,
            tags,
            demoConfig,
            repoData
        }
    });

    revalidatePath("/admin/projects");
    revalidatePath("/projects"); // If public page exists
    redirect("/admin/projects");
}

export async function createPost(formData: FormData) {
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const coverImage = formData.get("coverImage") as string;
    const author = formData.get("author") as string;
    const readTime = formData.get("readTime") as string;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    await prisma.post.create({
        data: {
            title,
            slug,
            excerpt,
            content,
            category,
            coverImage,
            author,
            readTime
        }
    });

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    redirect("/admin/blogs");
}

export async function deleteProject(id: string) {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/admin/projects");
}

export async function deletePost(id: string) {
    await prisma.post.delete({ where: { id } });
    revalidatePath("/admin/blogs");
}

export async function createJob(formData: FormData) {
    const title = formData.get("title") as string;
    const department = formData.get("department") as string;
    const location = formData.get("location") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;

    // Use ignore because of stale prisma types
    // @ts-ignore
    await prisma.job.create({
        data: {
            title,
            department,
            location,
            type,
            description
        }
    });

    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    redirect("/admin/careers");
}

export async function deleteJob(id: string) {
    // @ts-ignore
    await prisma.job.delete({ where: { id } });
    revalidatePath("/admin/careers");
    revalidatePath("/careers");
}

export async function updateContactInfo(formData: FormData) {
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    // We assume only one record exists or we create one
    // @ts-ignore
    const existing = await prisma.contactInfo.findFirst();

    if (existing) {
        // @ts-ignore
        await prisma.contactInfo.update({
            where: { id: existing.id },
            data: { email, phone, address }
        });
    } else {
        // @ts-ignore
        await prisma.contactInfo.create({
            data: { email, phone, address }
        });
    }

    revalidatePath("/admin/settings");
    revalidatePath("/contact");
    revalidatePath("/"); // Footer might have contact info
}

export async function updateLeadStatus(id: string, status: string) {
    // @ts-ignore
    await prisma.lead.update({
        where: { id },
        data: { status }
    });
    revalidatePath("/admin/leads");
}

export async function deleteLead(id: string) {
    // @ts-ignore
    await prisma.lead.delete({ where: { id } });
    revalidatePath("/admin/leads");
}
