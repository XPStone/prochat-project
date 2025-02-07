import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { messages = [] }: Partial<{ messages: Array<any> }> = await request.json();
    try {
        const apiKey = 'sk-a78d81e16e4a4f78b7473a0ee2c7c94e'; // 你的 API 密钥
        const response = await fetch(
            'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + apiKey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'qwen-turbo',
                    input: {
                        messages: [
                            {
                                role: 'system',
                                content: 'You are a helpful assistant.',
                            },
                            ...messages,
                        ],
                    },
                    parameters: {},
                }),
            },
        );
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error();
    }
}