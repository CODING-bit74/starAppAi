"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getPosts() {
    // @ts-ignore
    return await prisma.post.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function getPublishedPosts() {
    // @ts-ignore
    return await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' }
    });
}

export async function getPost(id: string) {
    // @ts-ignore
    return await prisma.post.findUnique({
        where: { id }
    });
}

export async function getPostBySlug(slug: string) {
    // @ts-ignore
    return await prisma.post.findUnique({
        where: { slug }
    });
}

export async function createPost(formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const coverImage = formData.get("coverImage") as string;
    const author = formData.get("author") as string;
    const category = formData.get("category") as string;
    const readTime = formData.get("readTime") as string;
    const published = formData.get("published") === "on";

    // @ts-ignore
    await prisma.post.create({
        data: {
            title,
            slug,
            excerpt,
            content,
            coverImage,
            author,
            category,
            readTime,
            published
        }
    });

    revalidatePath("/blog");
    revalidatePath("/admin/posts");
    redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const coverImage = formData.get("coverImage") as string;
    const author = formData.get("author") as string;
    const category = formData.get("category") as string;
    const readTime = formData.get("readTime") as string;
    const published = formData.get("published") === "on";

    // @ts-ignore
    await prisma.post.update({
        where: { id },
        data: {
            title,
            slug,
            excerpt,
            content,
            coverImage,
            author,
            category,
            readTime,
            published
        }
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/admin/posts");
    redirect("/admin/posts");
}

export async function deletePost(id: string) {
    // @ts-ignore
    await prisma.post.delete({
        where: { id }
    });
    revalidatePath("/admin/posts");
    revalidatePath("/blog");
}
