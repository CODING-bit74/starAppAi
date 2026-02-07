import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const solutions = await prisma.solution.findMany();
    console.log("Found " + solutions.length + " solutions:");
    solutions.forEach(s => {
        console.log(`- Title: ${s.title}, Slug: '${s.slug}', ID: ${s.id}`);
    });
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
