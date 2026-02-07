import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { firstName, lastName, email, budget, requirement } = body

        if (!email || !firstName || !requirement) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        const lead = await prisma.lead.create({
            data: {
                name: `${firstName} ${lastName}`.trim(),
                email,
                company: `Budget: ${budget}`, // Storing budget here for now
                message: requirement,
                status: "new"
            }
        })

        return NextResponse.json({ success: true, lead })
    } catch (error) {
        console.error("Contact API Error:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
