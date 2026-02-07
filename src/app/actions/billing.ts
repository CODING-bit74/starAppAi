"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPricingPlan(formData: FormData) {
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const currency = formData.get("currency") as string;
    const interval = formData.get("interval") as string;
    const features = formData.get("features") as string; // JSON string
    const popular = formData.get("popular") === "on";

    // @ts-ignore
    await prisma.pricingPlan.create({
        data: {
            name,
            price,
            currency,
            interval,
            features,
            popular
        }
    });

    revalidatePath("/admin/pricing");
    revalidatePath("/pricing");
    redirect("/admin/pricing");
}

export async function deletePricingPlan(id: string) {
    // @ts-ignore
    await prisma.pricingPlan.delete({ where: { id } });
    revalidatePath("/admin/pricing");
    revalidatePath("/pricing");
}

export async function createOrder(data: {
    planId: string;
    amount: number;
    currency: string;
    method: string;
    customerName: string;
    customerEmail: string;
    userId?: string;
}) {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // @ts-ignore
    const order = await prisma.order.create({
        data: {
            planId: data.planId,
            amount: data.amount,
            currency: data.currency,
            paymentMethod: data.method,
            status: "paid", // Simulate success
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            userId: data.userId
        }
    });

    return { success: true, orderId: order.id };
}
