import { Smartphone, Brain, Link as LinkIcon, Shield } from "lucide-react";

export interface Project {
    slug: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    icon: any;
    color: string;
    content: string;
    demoUrl?: string;
    repoUrl?: string;
    repoData?: {
        stars: number;
        forks: number;
        watching: number;
        lastUpdate: string;
        files: {
            name: string;
            type: "file" | "folder";
            lastCommit: string;
            time: string;
        }[];
    };
    demoConfig?: {
        type: "mobile" | "dashboard" | "landing";
        features: string[];
    };
}

export const PROJECTS_DATA: Project[] = [
    {
        slug: "e-commerce-super-app",
        title: "E-Commerce Super App",
        category: "Mobile Development",
        description: "A comprehensive Flutter-based shopping application with real-time inventory sync, AI-driven recommendations, and seamless payment gateways.",
        tags: ["Flutter", "Dart", "Firebase", "Stripe"],
        icon: Smartphone,
        color: "text-blue-400",
        content: `
            <h2>Project Overview</h2>
            <p>We built a high-performance mobile application for a leading retail chain, enabling them to bridge their physical and digital stores. The app features AR try-on, real-time inventory tracking across 500+ locations, and personalized AI shopping assistants.</p>
            
            <h3>Key Challenges</h3>
            <ul>
                <li>Synchronizing legacy inventory systems with modern cloud infrastructure.</li>
                <li>Ensuring sub-100ms response times for product search.</li>
                <li>Handling peak traffic during Black Friday sales events.</li>
            </ul>

            <h3>The Solution</h3>
            <p>Using Flutter, we created a unified codebase for iOS and Android. The backend utilizes Firebase for real-time data sync and Cloud Functions for serverless scalability. Stripe integration ensures secure and instant checkout.</p>
        `,
        demoUrl: "https://example.com/demo/ecommerce",
        repoUrl: "https://github.com/example/ecommerce-app",
        repoData: {
            stars: 156,
            forks: 42,
            watching: 18,
            lastUpdate: "4 hours ago",
            files: [
                { name: "lib", type: "folder", lastCommit: "feat: add payment gateway", time: "4 hours ago" },
                { name: "assets", type: "folder", lastCommit: "style: update icons", time: "2 days ago" },
                { name: "pubspec.yaml", type: "file", lastCommit: "chore: add flutter_stripe", time: "2 days ago" },
                { name: "README.md", type: "file", lastCommit: "docs: initial commit", time: "1 month ago" },
            ]
        },
        demoConfig: {
            type: "mobile",
            features: ["AR Try-On", "Inventory Sync", "AI Assistant"]
        }
    },
    {
        slug: "enterprise-rag-agent",
        title: "Enterprise RAG Agent",
        category: "Artificial Intelligence",
        description: "Intelligent document analysis system capable of ingesting thousands of legal and technical documents to provide instant, citation-backed answers.",
        tags: ["Python", "LangChain", "OpenAI", "Vector DB"],
        icon: Brain,
        color: "text-indigo-400",
        content: `
            <h2>Project Overview</h2>
            <p>An autonomous legal research assistant designed for a multinational law firm. This RAG (Retrieval-Augmented Generation) system processes vast repositories of case files to generate memos and answer complex queries with high precision.</p>

            <h3>Key Features</h3>
            <ul>
                <li><strong>Contextual Understanding:</strong> Uses advanced embedding models to grasp legal nuance.</li>
                <li><strong>Citation Tracking:</strong> Every answer is linked to original source documents.</li>
                <li><strong>Data Privacy:</strong> Fully on-premise deployment option for sensitive client data.</li>
            </ul>
        `,
        demoUrl: "https://example.com/demo/rag-agent",
        repoUrl: "https://github.com/example/rag-agent",
        repoData: {
            stars: 320,
            forks: 45,
            watching: 12,
            lastUpdate: "1 day ago",
            files: [
                { name: "embeddings", type: "folder", lastCommit: "feat: switch to openai-ada-002", time: "1 day ago" },
                { name: "vector_db", type: "folder", lastCommit: "fix: pinecone connection timeout", time: "4 days ago" },
                { name: "app.py", type: "file", lastCommit: "feat: add citation logic", time: "1 week ago" },
                { name: "Dockerfile", type: "file", lastCommit: "chore: optimize build size", time: "2 weeks ago" },
            ]
        },
        demoConfig: {
            type: "mobile",
            features: ["AR Try-On", "Inventory Sync", "AI Assistant"]
        }
    },
    {
        slug: "defi-exchange-platform",
        title: "DeFi Exchange Platform",
        category: "Blockchain",
        description: "Decentralized exchange (DEX) facilitating secure, non-custodial token swaps with automated market making (AMM) protocols.",
        tags: ["Solidity", "Next.js", "Web3.js", "Ethereum"],
        icon: LinkIcon,
        color: "text-cyan-400",
        content: `
            <h2>Project Overview</h2>
            <p>A next-generation DEX built on Ethereum Layer 2, offering near-zero gas fees and instant finality. This platform incorporates a novel AMM algorithm that minimizes impermanent loss for liquidity providers.</p>

            <h3>Technical Stack</h3>
            <p>Smart contracts written in Solidity and audited by top firms. The frontend is a high-speed Next.js application interacting with the blockchain via Web3.js and The Graph for indexing.</p>
        `,
        demoUrl: "https://example.com/demo/defi",
        repoUrl: "https://github.com/example/defi-exchange",
        repoData: {
            stars: 890,
            forks: 310,
            watching: 67,
            lastUpdate: "2 days ago",
            files: [
                { name: "contracts", type: "folder", lastCommit: "security: fix reentrancy vulnerability", time: "2 days ago" },
                { name: "frontend", type: "folder", lastCommit: "feat: wallet connect v2 support", time: "1 week ago" },
                { name: "scripts", type: "folder", lastCommit: "chore: deployment scripts", time: "2 months ago" },
                { name: "hardhat.config.js", type: "file", lastCommit: "config: update network settings", time: "3 months ago" },
            ]
        },
        demoConfig: {
            type: "mobile",
            features: ["AR Try-On", "Inventory Sync", "AI Assistant"]
        }
    },
    {
        slug: "ai-security-sentinel",
        title: "AI Security Sentinel",
        category: "Cybersecurity",
        description: "Real-time threat detection system utilizing behavioral analysis anomalies to prevent unauthorized access and data breaches.",
        tags: ["TensorFlow", "Cybersecurity", "React", "Node.js"],
        icon: Shield,
        color: "text-emerald-400",
        content: `
            <h2>Project Overview</h2>
            <p>A proactive cybersecurity defense system that uses machine learning to learn normal network behavior and flag anomalies instantly. It has successfully prevented over 100 potential breaches in its first 3 months of deployment.</p>

            <h3>Core Technology</h3>
            <p>TensorFlow models trained on petabytes of network logs. The system operates with a Kafka streaming pipeline to process millions of events per second with minimal latency.</p>
        `,
        demoUrl: "https://example.com/demo/security",
        repoUrl: "https://github.com/example/ai-sentinel",
        repoData: {
            stars: 2100,
            forks: 560,
            watching: 230,
            lastUpdate: "12 hours ago",
            files: [
                { name: "models", type: "folder", lastCommit: "feat: update anomaly detection weights", time: "12 hours ago" },
                { name: "pipeline", type: "folder", lastCommit: "perf: optimize kafka consumer", time: "1 day ago" },
                { name: "dashboard", type: "folder", lastCommit: "ui: add dark mode charts", time: "3 days ago" },
                { name: "README.md", type: "file", lastCommit: "docs: update setup instructions", time: "1 month ago" },
            ]
        },
        demoConfig: {
            type: "mobile",
            features: ["AR Try-On", "Inventory Sync", "AI Assistant"]
        }
    },
    {
        slug: "automating-defi-compliance",
        title: "Automating DeFi Compliance",
        category: "FinTech",
        description: "Implemented an autonomous agent swarm to monitor real-time transaction flows and ensure regulatory compliance across 3 jurisdictions.",
        tags: ["Agents", "RegTech", "Python", "Blockchain"],
        icon: Brain,
        color: "text-indigo-400",
        content: `
            <h2>Case Study: FinTech Global</h2>
            <p>We partnered with a major financial institution to automate their compliance workflows. By deploying a swarm of autonomous agents, we achieved a 75% reduction in audit time while increasing accuracy.</p>
            
            <h3>The Challenge</h3>
            <p>Manual compliance checks were slow, prone to error, and could not keep up with the speed of DeFi transactions.</p>

            <h3>Our Solution</h3>
            <p>We built a custom agent network that monitors mempools in real-time, cross-referencing addresses with sanctions lists and flagging suspicious patterns before transactions confirm.</p>
        `,
        demoUrl: "https://example.com/demo/fintech",
        repoUrl: "https://github.com/example/defi-compliance",
        repoData: {
            stars: 430,
            forks: 82,
            watching: 15,
            lastUpdate: "5 days ago",
            files: [
                { name: "agents", type: "folder", lastCommit: "feat: add sanction list crawler", time: "5 days ago" },
                { name: "core", type: "folder", lastCommit: "refactor: improve message passing", time: "1 week ago" },
                { name: "main.py", type: "file", lastCommit: "fix: startup sequence", time: "1 week ago" },
                { name: "requirements.txt", type: "file", lastCommit: "chore: add beautifulsoup4", time: "2 weeks ago" },
            ]
        },
        demoConfig: {
            type: "mobile",
            features: ["AR Try-On", "Inventory Sync", "AI Assistant"]
        }
    },
    {
        slug: "patient-data-sovereignty",
        title: "Patient Data Sovereignty",
        category: "Healthcare",
        description: "Deployed a private permissioned blockchain for secure, patient-controlled health data exchange between providers.",
        tags: ["Hyperledger", "Healthcare", "Privacy", "Zero-Knowledge"],
        icon: Shield,
        color: "text-pink-400",
        content: `
            <h2>Case Study: HealthCore Systems</h2>
            <p>This project returned data ownership to patients. Using zero-knowledge proofs, patients can now prove their eligibility for treatments or insurance without revealing sensitive underlying data.</p>
            
            <h3>Key Metrics</h3>
            <ul>
                <li><strong>1M+</strong> patient records secured.</li>
                <li><strong>0</strong> data breaches.</li>
                <li><strong>30%</strong> reduction in administrative costs.</li>
            </ul>
        `,
        demoUrl: "https://example.com/demo/healthcore",
        repoUrl: "https://github.com/example/patient-data",
        repoData: {
            stars: 1205,
            forks: 340,
            watching: 89,
            lastUpdate: "1 day ago",
            files: [
                { name: "contracts", type: "folder", lastCommit: "feat: implement ZK-proof verification", time: "1 day ago" },
                { name: "api", type: "folder", lastCommit: "fix: latency in data retrieval", time: "5 days ago" },
                { name: "README.md", type: "file", lastCommit: "docs: add security audit report", time: "2 weeks ago" },
                { name: "deployment.yaml", type: "file", lastCommit: "chore: update k8s config", time: "1 month ago" },
            ]
        },
        demoConfig: {
            type: "mobile",
            features: ["AR Try-On", "Inventory Sync", "AI Assistant"]
        }
    },
    {
        slug: "supply-chain-optimization",
        title: "Supply Chain Optimization",
        category: "Logistics",
        description: "Built a predictive logistics engine using RAG to analyze historical shipping data and optimize routes in real-time.",
        tags: ["AI", "Logistics", "RAG", "Geospatial"],
        icon: Brain,
        color: "text-orange-400",
        content: `
            <h2>Case Study: LogisticsAI</h2>
            <p>Optimizing global shipping routes in a volatile world is complex. Our RAG-based engine digests news, weather, and port congestion data to reroute ships proactively.</p>
            
            <h3>Impact</h3>
            <p>The system saved over 2,000 man-hours per month in planning time and reduced fuel consumption by 12% across the fleet.</p>
        `,
        demoUrl: "https://example.com/demo/supply-chain",
        repoUrl: "https://github.com/example/supply-chain",
        repoData: {
            stars: 842,
            forks: 156,
            watching: 42,
            lastUpdate: "3 hours ago",
            files: [
                { name: "src", type: "folder", lastCommit: "feat: tracking logic optimization", time: "3 hours ago" },
                { name: "tests", type: "folder", lastCommit: "test: added unit tests for routing", time: "2 days ago" },
                { name: ".gitignore", type: "file", lastCommit: "chore: update ignore files", time: "2 months ago" },
                { name: "README.md", type: "file", lastCommit: "docs: update deployment guide", time: "1 week ago" },
                { name: "package.json", type: "file", lastCommit: "chore: bump dependencies", time: "1 week ago" },
                { name: "optimization_engine.py", type: "file", lastCommit: "fix: memory leak in solver", time: "2 days ago" },
            ]
        },
        demoConfig: {
            type: "dashboard",
            features: ["Document Upload", "Citation View", "Export Memo"]
        }
    }
];
