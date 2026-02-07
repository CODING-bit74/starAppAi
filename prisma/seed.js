const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaults = {
    privacy: `
        <h1>Privacy Policy</h1>
        <p>Last updated: December 21, 2024</p>
        <h2>1. Introduction</h2>
        <p>StarApp.AI respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
        <h2>2. Data We Collect</h2>
        <p>We collect Identity Data, Contact Data, Technical Data, and Usage Data. We do not collect any Special Categories of Personal Data about you.</p>
        <h2>3. How We Use Your Data</h2>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party).</li>
            <li>Where we need to comply with a legal or regulatory obligation.</li>
        </ul>
        <h2>4. Data Security</h2>
        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>
        <h2>5. Contact Us</h2>
        <p>If you have any questions about this privacy policy, please contact us at privacy@starapp.ai.</p>
    `,
    terms: `
        <h1>Terms of Service</h1>
        <p>Last updated: December 21, 2024</p>
        <h2>1. Agreement to Terms</h2>
        <p>By accessing our website, you agree to be bound by these Terms of Service and to verify read.</p>
        <h2>2. Intellectual Property Rights</h2>
        <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us.</p>
        <h2>3. User Representations</h2>
        <p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.</p>
        <h2>4. Prohibited Activities</h2>
        <p>You may not access or use the Site for any purpose other than that for which we make the Site available.</p>
        <h2>5. Contact Us</h2>
        <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at legal@starapp.ai.</p>
    `,
    cookies: `
        <h1>Cookie Policy</h1>
        <p>Last updated: December 21, 2024</p>
        <h2>1. What Are Cookies</h2>
        <p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience.</p>
        <h2>2. How We Use Cookies</h2>
        <p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
        <h2>3. Disabling Cookies</h2>
        <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this).</p>
        <h2>4. The Cookies We Set</h2>
        <ul>
            <li><strong>Account related cookies:</strong> If you create an account with us then we will use cookies for the management of the signup process and general administration.</li>
            <li><strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact.</li>
        </ul>
        <h2>5. More Information</h2>
        <p>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren&apos;t sure whether you need or not it&apos;s usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.</p>
    `
};

async function main() {
    console.log('Start seeding Legal Docs...');

    for (const [slug, content] of Object.entries(defaults)) {
        let title = '';
        if (slug === 'privacy') title = 'Privacy Policy';
        if (slug === 'terms') title = 'Terms of Service';
        if (slug === 'cookies') title = 'Cookie Policy';

        const doc = await prisma.legalDoc.upsert({
            where: { slug: slug },
            update: { content: content },
            create: {
                title: title,
                slug: slug,
                content: content,
            },
        });
        console.log(`Created/Updated legal doc: ${doc.title}`);
        console.log(`Created/Updated legal doc: ${doc.title}`);
    }

    await seedDocs();
    await seedPricing();
    await seedFAQs();

    console.log('Seeding finished.');
}

const docsData = [
    {
        title: "Introduction",
        slug: "introduction",
        category: "Overview",
        order: 1,
        content: `
            <h1>Welcome to StarApp.AI</h1>
            <p>StarApp.AI is the leading platform for enterprise autonomous agents and blockchain infrastructure.</p>
            <p>Our mission is to bridge the gap between human intent and AI execution, providing a secure and scalable foundation for the next generation of business automation.</p>
            <h2>Why StarApp?</h2>
            <ul>
                <li><strong>Autonomous Agents:</strong> Deploy 24/7 intelligent swarms to handle complex workflows.</li>
                <li><strong>Blockchain Security:</strong> Every action is verifiable and immutable on our custom chain.</li>
                <li><strong>Enterprise Scale:</strong> Built to handle millions of transactions with 99.9% uptime.</li>
            </ul>
        `
    },
    {
        title: "Our Story",
        slug: "our-story",
        category: "Overview",
        order: 2,
        content: `
            <h1>The StarApp Story</h1>
            <p class="lead">From a garage experiment to the backbone of the autonomous economy.</p>
            
            <h2>The Spark</h2>
            <p>It was late 2023. The world was captivated by the release of powerful Large Language Models. But for Arpit Mishra and Mohit Raj, there was a missing piece. "We saw these incredible models that could write poetry and code," recalls Arpit, "but they couldn't <em>do</em> anything. They were trapped in a chat box."</p>
            <p>The realization hit during a hackathon: <strong>Intelligence without agency is just a parlor trick.</strong></p>

            <h2>The First Agent</h2>
            <p>They spent the next six weeks building "Protocol Zero" — a crude prototype of an AI agent that could not only plan a marketing campaign but actually execute it: buying ads, setting up landing pages, and analyzing results. It worked. But it was dangerous. Without guardrails, the agent hallucinated and overspent its budget in minutes.</p>

            <h2>Enter Blockchain</h2>
            <p>This failure led to the core innovation of StarApp. "We needed a layer of trust," says Mohit. "A way to enforce rules that even the AI couldn't break." They integrated a custom blockchain layer to act as the "superego" for the AI's "id." Smart contracts became the laws of physics for these digital agents.</p>

            <h2>Building the Future</h2>
            <p>Today, StarApp.AI powers thousands of autonomous swarms for enterprises worldwide. We aren't just building software; we are architecting a new kind of workforce. One that is tireless, intelligent, and above all, trustworthy.</p>
            
            <div style="margin-top: 2rem; padding: 2rem; background: rgba(245, 158, 11, 0.1); border-left: 4px solid #F59E0B; border-radius: 0 1rem 1rem 0;">
                <p style="font-style: italic; color: #FFF; font-size: 1.1rem; margin: 0;">"We believe that in the next decade, the majority of the world's GDP will be generated by autonomous software. We are here to ensure that future is secure."</p>
                <p style="margin-top: 1rem; color: #F59E0B; font-weight: bold;">— Arpit Mishra, CEO</p>
            </div>
        `
    },
    {
        title: "Meet the Founders",
        slug: "founders",
        category: "Overview",
        order: 3,
        content: `
            <h1>Meet the Visionaries</h1>
            <p>The minds behind the autonomous revolution — bridging the gap between human intent and AI execution.</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 2rem;">
                <!-- Arpit Mishra -->
                <div style="border: 1px solid rgba(255,255,255,0.1); border-radius: 1rem; padding: 1.5rem; background: rgba(255,255,255,0.05);">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold; color: white; margin-bottom: 1rem;">A</div>
                    <h3>Arpit Mishra</h3>
                    <p style="color: #F59E0B; font-weight: bold;">Chief Executive Officer</p>
                    <p>Visionary leader with 10+ years in AI & Blockchain. Formerly at TechGiant exploring AGI.</p>
                </div>

                <!-- Mohit Raj -->
                <div style="border: 1px solid rgba(255,255,255,0.1); border-radius: 1rem; padding: 1.5rem; background: rgba(255,255,255,0.05);">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold; color: white; margin-bottom: 1rem;">M</div>
                    <h3>Mohit Raj</h3>
                    <p style="color: #F59E0B; font-weight: bold;">Chief Technology Officer</p>
                    <p>Architecting the future of decentralized autonomous agents. Expert in distributed systems.</p>
                </div>

                <!-- Manik -->
                <div style="border: 1px solid rgba(255,255,255,0.1); border-radius: 1rem; padding: 1.5rem; background: rgba(255,255,255,0.05);">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold; color: white; margin-bottom: 1rem;">M</div>
                    <h3>Manik</h3>
                    <p style="color: #F59E0B; font-weight: bold;">Chief Technology Officer</p>
                    <p>Architecting the future of decentralized autonomous agents. Expert in distributed systems.</p>
                </div>
            </div>
        `
    },
    {
        title: "Architecture",
        slug: "architecture",
        category: "Overview",
        order: 4,
        content: `
            <h1>System Architecture</h1>
            <p>StarApp.AI is built on a microservices architecture, designed for high availability and fault tolerance.</p>
            <h2>Core Components</h2>
            <h3>1. The Neural Mesh</h3>
            <p>Our proprietary communication layer that allows agents to coordinate and share context in real-time.</p>
            <h3>2. The Ledger</h3>
            <p>A high-throughput blockchain optimized for agent-to-agent transactions and audit logs.</p>
            <h3>3. The Cortex</h3>
            <p>Our centralized AI orchestration engine that manages resource allocation and model inference.</p>
        `
    },
    {
        title: "AI Agents",
        slug: "ai-agents",
        category: "Features",
        order: 1,
        content: `
            <h1>AI Agents</h1>
            <p>Our agents are not just chatbots; they are autonomous entities capable of executing complex tasks.</p>
            <h2>Capabilities</h2>
            <ul>
                <li><strong>Data Analysis:</strong> Ingest and process gigabytes of data in seconds.</li>
                <li><strong>Decision Making:</strong> Use reinforcement learning to optimize outcomes over time.</li>
                <li><strong>Tool Use:</strong> securely interact with external APIs, databases, and software.</li>
            </ul>
        `
    },
    {
        title: "Blockchain Integration",
        slug: "blockchain",
        category: "Features",
        order: 2,
        content: `
            <h1>Blockchain Integration</h1>
            <p>Security and trust are paramount in enterprise automation. We use blockchain to ensure transparency.</p>
            <h2>Smart Contracts for Agents</h2>
            <p>Agents execute logic based on immutable smart contracts, ensuring they strictly adhere to defined rules and budgets.</p>
            <h2>Audit Trails</h2>
            <p>Every decision and action taken by an agent is cryptographically signed and recorded.</p>
        `
    },
    {
        title: "Getting Started",
        slug: "getting-started",
        category: "Guides",
        order: 1,
        content: `
            <h1>Getting Started</h1>
            <p>Ready to deploy your first agent swarm? Follow these simple steps.</p>
            <h2>1. Create an Account</h2>
            <p>Sign up for an enterprise account to get access to the dashboard.</p>
            <h2>2. Define Your Objectives</h2>
            <p>Use our detailed template builder to define what you want your agents to achieve.</p>
            <h2>3. Deploy</h2>
            <p>Click "Launch" and watch your agents spring to action in the visualizer.</p>
        `
    }
];

async function seedDocs() {
    console.log('Start seeding Documentation...');
    for (const doc of docsData) {
        await prisma.doc.upsert({
            where: { slug: doc.slug },
            update: {
                title: doc.title,
                content: doc.content,
                category: doc.category,
                order: doc.order
            },
            create: {
                title: doc.title,
                slug: doc.slug,
                content: doc.content,
                category: doc.category,
                order: doc.order
            }
        });
        console.log(`Created/Updated doc: ${doc.title}`);
    }
}

async function seedPricing() {
    console.log('Start seeding Pricing Plans...');
    // Clear existing plans to avoid duplicates/conflicts during development
    try {
        await prisma.pricingPlan.deleteMany({});
        console.log('Cleared existing pricing plans.');
    } catch (e) {
        console.log('No existing plans to clear or error clearing.');
    }

    const plans = [
        {
            name: "Starter",
            price: 299,
            currency: "USD",
            interval: "month",
            popular: false,
            features: JSON.stringify([
                "5 Autonomous Agents",
                "1,000 Transactions/mo",
                "Basic Analytics",
                "Community Support",
                "Standard Response Time"
            ])
        },
        {
            name: "Pro",
            price: 799,
            currency: "USD",
            interval: "month",
            popular: true,
            features: JSON.stringify([
                "20 Autonomous Agents",
                "50,000 Transactions/mo",
                "Advanced Neural Mesh Access",
                "Blockchain Audit Logs",
                "Priority Email Support",
                "Custom Agent Templates"
            ])
        },
        {
            name: "Enterprise",
            price: 2499,
            currency: "USD",
            interval: "month",
            popular: false,
            features: JSON.stringify([
                "Unlimited Agents",
                "Unlimited Transactions",
                "Dedicated Private Chain",
                "On-premise Deployment Option",
                "24/7 Dedicated Account Manager",
                "Custom Smart Contract Development",
                "SLA Guarantee"
            ])
        }
    ];

    for (const plan of plans) {
        await prisma.pricingPlan.create({
            data: plan
        });
        console.log(`Created pricing plan: ${plan.name}`);
    }
}

async function seedFAQs() {
    console.log('Start seeding FAQs...');
    try {
        await prisma.faq.deleteMany({});
        console.log('Cleared existing FAQs.');
    } catch (e) {
        console.log('No existing FAQs or error clearing.');
    }

    const faqs = [
        {
            question: "How does the 'Autonomous' part work?",
            answer: "Our agents operate independently based on the high-level goals you set. They use our proprietary Neural Mesh to break down goals into tasks, execute them, and report back. You don't need to script every step.",
            order: 1
        },
        {
            question: "Is my data secure?",
            answer: "Absolutely. We rely on blockchain immutability for audit logs and use enterprise-grade encryption for all data in transit and at rest. The Enterprise plan also offers private chain deployments.",
            order: 2
        },
        {
            question: "Can I upgrade or downgrade later?",
            answer: "Yes, you can scale your plan up or down at any time from your dashboard. Prorated credits will be applied automatically.",
            order: 3
        },
        {
            question: "Do you offer custom integrations?",
            answer: "Our Pro and Enterprise plans come with extensive API access. For bespoke integrations, our Enterprise team can build custom smart contracts and agent adapters for your legacy systems.",
            order: 4
        }
    ];

    for (const faq of faqs) {
        await prisma.faq.create({
            data: faq
        });
        console.log(`Created FAQ: ${faq.question}`);
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
