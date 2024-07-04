import { createOpenAI } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';

export async function POST(request: Request) {
    const { messages = [] }: Partial<{ messages: Array<any> }> = await request.json();

    const PickMessages = messages.map((message) => {
        return {
            role: message.role,
            content: message.content,
        };
    });

    const openai = createOpenAI({
        // custom settings, e.g.
        apiKey: 'sk-Y7CratKzZPjQCITlM3lPik5RyHE0zTKSt7hHj9ptBRPEolex', // your openai key
        baseURL: 'https://api.chatanywhere.tech/v1',
        compatibility: 'compatible',
    });
    const stream = await streamText({
        model: openai('gpt-3.5-turbo'),
        messages: [...PickMessages],
    });
    return new StreamingTextResponse(stream.textStream);
}