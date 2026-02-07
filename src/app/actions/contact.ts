"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitLead(formData: FormData) {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const budget = formData.get("budget") as string;
    const requirement = formData.get("requirement") as string;

    const name = `${firstName} ${lastName}`;
    const message = `Budget: ${budget}\n\nRequirements:\n${requirement}`;

    // @ts-ignore
    await prisma.lead.create({
        data: {
            name,
            email,
            message,
            status: "new"
        }
    });

    revalidatePath("/admin/leads");
}
