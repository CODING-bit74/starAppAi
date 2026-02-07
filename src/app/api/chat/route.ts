import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getActiveKnowledge } from "@/app/actions/chat-settings";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1];
        const userQuery = lastMessage.content;

        // 1. Retrieve Context logic
        // Fetch active knowledge from DB
        const knowledgeEntries = await getActiveKnowledge();
        const context = knowledgeEntries.map((k: any) => `Topic: ${k.topic}\nInfo: ${k.content}`).join("\n\n");

        // 2. Check for API Key
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            // FALLBACK: If no API key, return a smart mock response (simulating the "Advanced" behavior but server-side)
            // This ensures the site works for the user immediately without configuration, while proving the architecture is there.
            console.warn("No OPENAI_API_KEY found. Using mock response.");

            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network/processing delay

            const mockResponse = generateMockResponse(userQuery, context);
            return NextResponse.json({
                role: 'bot',
                content: mockResponse
            });
        }

        // 3. Real LLM Call
        const openai = new OpenAI({ apiKey });

        const systemPrompt = `You are StarApp.AI, an intelligent agent for an AI & Blockchain SaaS platform.
        
        Use the following context to answer the user's question. If the answer is not in the context, use your general knowledge but mention that you are an AI assistant for Nexus.
        
        CONTEXT:
        ${context}
        
        Keep answers concise, professional, and helpful. Use markdown formatting for bold text or lists.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview", // or gpt-3.5-turbo
            messages: [
                { role: "system", content: systemPrompt },
                ...messages.map((m: { role: string, content: string }) => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.content }))
            ],
            temperature: 0.7,
        });

        return NextResponse.json({
            role: 'bot',
            content: completion.choices[0].message.content
        });

    } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

function generateMockResponse(query: string, context: string): string {
    // If we found context, use it to "pretend" we read it
    if (context) {
        return `[Mock RAG] Based on my knowledge base:\n\n${context}\n\n(To enable real GPT-4 responses, please add OPENAI_API_KEY to your .env.local file)`;
    }

    // Fallback similar to frontend logic
    const lower = query.toLowerCase();
    if (lower.includes("price")) return "Our pricing starts at $49/mo. (Mock response)";
    return "I received your message! I'm currently running in 'Mock Mode' because no OpenAI API Key was detected. Please configure the backend to unlock my full potential.";
}
