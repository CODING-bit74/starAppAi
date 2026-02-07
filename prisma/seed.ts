import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const PROJECTS = [
    {
        slug: "e-commerce-super-app",
        title: "E-Commerce Super App",
        category: "Mobile Development",
        description: "A comprehensive Flutter-based shopping application with real-time inventory sync, AI-driven recommendations, and seamless payment gateways.",
        content: "<h2>Project Overview</h2><p>Full content...</p>",
        tags: "Flutter,Dart,Firebase,Stripe",
        demoUrl: "https://example.com/demo/ecommerce",
        repoUrl: "https://github.com/example/ecommerce-app",
        stars: 156,
        forks: 42,
        watching: 18,
    },
    {
        slug: "enterprise-rag-agent",
        title: "Enterprise RAG Agent",
        category: "Artificial Intelligence",
        description: "Intelligent document analysis system capable of ingesting thousands of legal and technical documents.",
        content: "<h2>Overview</h2><p>RAG Agent content...</p>",
        tags: "Python,LangChain,OpenAI,Vector DB",
        demoUrl: "https://example.com/demo/rag-agent",
        repoUrl: "https://github.com/example/rag-agent",
        stars: 320,
        forks: 45,
        watching: 12,
    },
    // Add more mock projects if needed
]

const POSTS = [
    {
        slug: "future-of-ai-agents",
        title: "The Future of AI Agents in Enterprise",
        excerpt: "How autonomous agents are reshaping business workflows and decision making.",
        content: "<p>Deep dive content...</p>",
        author: "Alex Rivera",
        category: "Artificial Intelligence",
        readTime: "5 min read",
        published: true
    },
    {
        slug: "blockchain-scalability-2025",
        title: "Blockchain Scalability: Solutions for 2025",
        excerpt: "Analyzing Layer 2 solutions and their impact on DeFi adoption.",
        content: "<p>Blockchain content...</p>",
        author: "Sarah Chen",
        category: "Blockchain",
        readTime: "8 min read",
        published: true
    }
]

async function main() {
    console.log('Start seeding ...')

    for (const project of PROJECTS) {
        const p = await prisma.project.upsert({
            where: { slug: project.slug },
            update: {},
            create: project,
        })
        console.log(`Created project with id: ${p.id}`)
    }

    for (const post of POSTS) {
        const p = await prisma.post.upsert({
            where: { slug: post.slug },
            update: {},
            create: post,
        })
        console.log(`Created post with id: ${p.id}`)
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
