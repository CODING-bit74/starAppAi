"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function submitApplication(formData: FormData) {
    const jobId = formData.get("jobId") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const file = formData.get("resume") as File;
    const coverLetter = formData.get("coverLetter") as string;

    if (!jobId || !name || !email || !file) {
        // In a real app we'd return an error state
        throw new Error("Missing required fields");
    }

    // save file locally
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ensure directory exists
    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    // unique filename
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
    const filepath = join(uploadDir, filename);

    await writeFile(filepath, buffer);
    const resumeUrl = `/uploads/${filename}`;

    // @ts-ignore
    await prisma.application.create({
        data: {
            jobId,
            name,
            email,
            resumeUrl,
            coverLetter
        }
    });

    revalidatePath(`/admin/careers`);
    redirect("/careers/success");
}
