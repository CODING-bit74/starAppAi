import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Start seeding chatbot knowledge...");

    const knowledgeData = [
        {
            topic: "Pricing Plans",
            content: "We have three main pricing tiers:\n1. **Startup ($49/mo)**: Ideal for early-stage companies. Includes 5 users and basic analytics.\n2. **Growth ($199/mo)**: For scaling teams. Includes 20 users, advanced analytics, and priority support.\n3. **Enterprise (Custom)**: For large organizations. Unlimited users, dedicated account manager, and SLA. Contact sales for a quote.",
            keywords: "price, cost, plan, subscription, startup, enterprise"
        },
        {
            topic: "Tech Stack",
            content: "StarApp.AI is built using a modern, scalable stack:\n- **Frontend**: Next.js 14, React, Tailwind CSS\n- **Backend**: Node.js, Prisma, PostgreSQL (compatible)\n- **AI**: OpenAI GPT-4 Turbo for intelligent agents",
            keywords: "tech, stack, technology, react, nextjs, ai"
        },
        {
            topic: "Contact Support",
            content: "You can reach our support team 24/7 via:\n- **Email**: support@starapp.ai\n- **Live Chat**: Right here in the dashboard!\n- **Phone**: +1 (555) 123-4567\nWe typically respond within 15 minutes.",
            keywords: "support, help, contact, email, phone"
        },
        {
            topic: "About StarApp.AI",
            content: "StarApp.AI is an intelligent automation platform designed to help enterprises streamline their workflows using AI agents. Founded in 2024, we treat AI as a collaborator, not just a tool.",
            keywords: "about, company, mission, what is"
        }
    ];

    for (const k of knowledgeData) {
        await prisma.botKnowledge.create({
            data: k
        });
    }

    console.log("Seeding chatbot suggestions...");
    const suggestionData = [
        { text: "How much does it cost?", order: 1, active: true },
        { text: "Show me case studies", order: 2, active: true },
        { text: "Book a demo call", order: 3, active: true },
        { text: "What services do you offer?", order: 4, active: true }
    ];

    for (const s of suggestionData) {
        // @ts-ignore
        await prisma.botSuggestion.create({
            data: s
        });
    }

    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
