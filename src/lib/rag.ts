export const contextData = [
    {
        topic: "Pricing",
        content: "StarApp.AI offers three pricing tiers: Starter at $49/month for solopreneurs (1 agent, 1k queries), Pro at $199/month for growing teams (5 agents, 10k queries, priority support), and Enterprise (Custom) for large organizations requiring unlimited agents, full RAG pipeline, and white-labeling."
    },
    {
        topic: "Services",
        content: "We offer Enterprise-Grade Capabilities including AI & Machine Learning (Custom LLM training, RAG), Blockchain Solutions (Smart contracts, DeFi), Web3 Development (dApps), Cybersecurity (Threat detection), Automation (Intelligent agents), and Data Analytics."
    },
    {
        topic: "Company Info",
        content: "StarApp.AI was founded in 2024 with a mission to democratize autonomous agent technology. We serve clients in 15+ countries with a 98% retention rate. We combine cutting-edge AI with secure blockchain infrastructure."
    },
    {
        topic: "Technology Stack",
        content: "Our tech stack includes Next.js, React, and Tailwind CSS for frontend; Python, Node.js, and Go for backend. We use OpenAI GPT-4 and Claude 3 for AI models, and support Ethereum, Solana, and Polygon blockchains."
    },
    {
        topic: "Case Study: FinTech Global",
        content: "For FinTech Global, we automated DeFi compliance using an autonomous agent swarm, reducing audit time by 75%."
    },
    {
        topic: "Case Study: HealthCore",
        content: "For HealthCore Systems, we deployed a private permissioned blockchain to secure 1M+ patient records, ensuring data sovereignty."
    },
    {
        topic: "Case Study: LogisticsAI",
        content: "For LogisticsAI, we built a predictive logistics engine using RAG to analyze historical shipping data, saving 2000+ man-hours per month."
    }
];

export function getRelevantContext(query: string): string {
    const tokens = query.toLowerCase().split(/\s+/).filter(t => t.length > 3);
    if (tokens.length === 0) return "";

    const scored = contextData.map(item => {
        let score = 0;
        tokens.forEach(token => {
            if (item.content.toLowerCase().includes(token)) score += 1;
            if (item.topic.toLowerCase().includes(token)) score += 2;
        });
        return { content: item.content, score };
    });

    // Sort by score descending and take top 3 positive matches
    const top = scored.filter(i => i.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);

    return top.map(i => i.content).join("\n\n");
}
