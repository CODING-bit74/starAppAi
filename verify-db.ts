import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Checking Prisma Models...");

    if ((prisma as any).botKnowledge) {
        console.log("✅ prisma.botKnowledge exists");
    } else {
        console.error("❌ prisma.botKnowledge MISSING");
    }

    if ((prisma as any).botSuggestion) {
        console.log("✅ prisma.botSuggestion exists");
    } else {
        console.error("❌ prisma.botSuggestion MISSING");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
