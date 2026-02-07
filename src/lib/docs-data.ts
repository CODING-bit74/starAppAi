export const DOCS_DATA = [
    {
        category: "Getting Started",
        items: [
            {
                id: "introduction",
                title: "Introduction",
                content: `
                    <h1 class="text-3xl font-bold mb-4">Introduction to StarApp.AI</h1>
                    <p class="text-slate-400 mb-6">StarApp.AI is the world's leading autonomous enterprise platform, combining the power of multi-agent AI systems with the security of blockchain technology.</p>
                    
                    <h2 class="text-2xl font-semibold mt-8 mb-4">Core Concepts</h2>
                    <ul class="list-disc pl-6 space-y-2 text-slate-300">
                        <li><strong>Agent Swarms:</strong> Deploy coordinated teams of AI agents to handle complex workflows.</li>
                        <li><strong>Blockchain Verification:</strong> Every agent decision is immutable and verifiable on-chain.</li>
                        <li><strong>Contextual Intelligence:</strong> Agents share a unified memory across your entire organization.</li>
                    </ul>

                    <div class="mt-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                        <p class="text-indigo-300"><strong>Note:</strong> StarApp.AI is currently in private beta. Contact sales for early access.</p>
                    </div>
                `
            },
            {
                id: "quickstart",
                title: "Quick Start",
                content: `
                    <h1 class="text-3xl font-bold mb-4">Quick Start Guide</h1>
                    <p class="text-slate-400 mb-6">Get your first agent swarm running in under 5 minutes.</p>

                    <h3 class="text-xl font-semibold mt-8 mb-4">1. Install the CLI</h3>
                    <code class="block bg-black/50 p-4 rounded-lg text-green-400 font-mono mb-6">npm install -g starapp-cli</code>

                    <h3 class="text-xl font-semibold mt-8 mb-4">2. Initialize Project</h3>
                    <code class="block bg-black/50 p-4 rounded-lg text-green-400 font-mono mb-6">starapp init my-enterprise-app</code>

                    <h3 class="text-xl font-semibold mt-8 mb-4">3. Deploy Agents</h3>
                    <p class="text-slate-400">Configure your <code>starapp.config.js</code> and run:</p>
                    <code class="block bg-black/50 p-4 rounded-lg text-green-400 font-mono mt-2">starapp deploy --env=production</code>
                `
            }
        ]
    },
    {
        category: "Agent API",
        items: [
            {
                id: "agents-create",
                title: "Create Agent",
                content: `
                    <h1 class="text-3xl font-bold mb-4">Create Agent</h1>
                    <p class="text-slate-400 mb-6">The <code>/v1/agents</code> endpoint allows you to programmatically spawn new AI agents.</p>

                    <div class="flex items-center gap-2 mb-4">
                        <span class="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm font-mono">POST</span>
                        <span class="font-mono text-slate-300">https://api.starapp.ai/v1/agents</span>
                    </div>

                    <h3 class="text-xl font-semibold mt-8 mb-4">Request Body</h3>
                    <pre class="bg-black/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{
  "name": "FinanceBot_01",
  "role": "analyst",
  "capabilities": ["read_pdf", "market_analysis"],
  "model": "gpt-4-turbo"
}
                    </pre>

                    <h3 class="text-xl font-semibold mt-8 mb-4">Response</h3>
                    <pre class="bg-black/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{
  "id": "ag_123456789",
  "status": "provisioning",
  "created_at": "2024-12-21T12:00:00Z"
}
                    </pre>
                `
            },
            {
                id: "agents-list",
                title: "List Agents",
                content: `
                    <h1 class="text-3xl font-bold mb-4">List Agents</h1>
                    <p class="text-slate-400 mb-6">Retrieve a paginated list of all active agents in your organization.</p>

                    <div class="flex items-center gap-2 mb-4">
                        <span class="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm font-mono">GET</span>
                        <span class="font-mono text-slate-300">https://api.starapp.ai/v1/agents</span>
                    </div>
                `
            }
        ]
    },
    {
        category: "Blockchain Integration",
        items: [
            {
                id: "smart-contracts",
                title: "Smart Contracts",
                content: `
                    <h1 class="text-3xl font-bold mb-4">Smart Contract Integration</h1>
                    <p class="text-slate-400 mb-6">StarApp.AI natively bridges AI decisions to on-chain smart contracts.</p>
                    
                    <h3 class="text-xl font-semibold mt-8 mb-4">Supported Networks</h3>
                    <ul class="grid grid-cols-2 gap-4 mt-4">
                        <li class="p-3 bg-white/5 rounded border border-white/10 text-center">Ethereum Mainnet</li>
                        <li class="p-3 bg-white/5 rounded border border-white/10 text-center">Polygon PoS</li>
                        <li class="p-3 bg-white/5 rounded border border-white/10 text-center">Solana</li>
                        <li class="p-3 bg-white/5 rounded border border-white/10 text-center">Hyperledger Fabric</li>
                    </ul>
                `
            }
        ]
    }
];
