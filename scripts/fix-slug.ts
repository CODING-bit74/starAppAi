import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.solution.updateMany({
        where: { title: "N8N Automation" },
        data: { slug: "n8n-automation" }
    });
    console.log("Updated slug for N8N Automation");
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
